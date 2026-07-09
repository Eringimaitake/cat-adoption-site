import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

const CATEGORY_LABELS: Record<string, string> = {
  里親希望: "里親になりたい",
  譲渡会参加: "譲渡会への参加について",
  保護相談: "猫の保護相談",
  ボランティア: "ボランティア参加",
  その他: "その他",
};

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHtml(fields: {
  name: string;
  email: string;
  phone: string;
  category: string;
  message: string;
}): string {
  const { name, email, phone, category, message } = fields;
  const categoryLabel = CATEGORY_LABELS[category] ?? category;
  const rows = [
    ["お名前", esc(name)],
    ["メールアドレス", esc(email)],
    ["電話番号", phone ? esc(phone) : "（未記入）"],
    ["種別", esc(categoryLabel)],
  ];

  const tableRows = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:8px 12px;background:#F5E6D5;color:#8A5A2A;font-weight:bold;font-size:13px;width:130px;vertical-align:top;white-space:nowrap;">${label}</td>
        <td style="padding:8px 12px;background:#fff;color:#5C3D2E;font-size:14px;">${value}</td>
      </tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#FDF6EE;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

    <!-- Header -->
    <div style="background:#5C3D2E;padding:20px 24px;">
      <p style="margin:0;color:#F5E6D5;font-size:11px;letter-spacing:1px;">NEKO NEKO ICHI</p>
      <h1 style="margin:4px 0 0;color:#fff;font-size:18px;">お問い合わせが届きました</h1>
    </div>

    <!-- Fields table -->
    <div style="padding:24px 24px 0;">
      <table style="width:100%;border-collapse:collapse;border-radius:8px;overflow:hidden;border:1px solid #F5E6D5;">
        ${tableRows}
      </table>
    </div>

    <!-- Message -->
    <div style="padding:20px 24px 24px;">
      <p style="margin:0 0 8px;font-size:13px;font-weight:bold;color:#8A5A2A;">お問い合わせ内容</p>
      <div style="background:#FDF6EE;border-radius:8px;padding:16px;font-size:14px;color:#5C3D2E;line-height:1.7;white-space:pre-wrap;">${esc(message)}</div>
    </div>

    <!-- Footer -->
    <div style="background:#F5E6D5;padding:14px 24px;">
      <p style="margin:0;font-size:11px;color:#A67C5B;">
        ※ このメールに返信すると <strong>${esc(name)}</strong> 様（${esc(email)}）に直接返信されます。
      </p>
    </div>

  </div>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "リクエストが不正です" }, { status: 400 });
  }

  const { name, email, phone = "", category, message } = body as {
    name?: string;
    email?: string;
    phone?: string;
    category?: string;
    message?: string;
  };

  // Server-side validation
  if (!name?.trim() || !email?.trim() || !category?.trim() || !message?.trim()) {
    return Response.json({ error: "必須項目が入力されていません" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "メールアドレスの形式が正しくありません" }, { status: 400 });
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  if (!gmailUser || !gmailPass) {
    console.error("GMAIL_USER / GMAIL_APP_PASSWORD が設定されていません");
    return Response.json({ error: "サーバー設定エラーです" }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailPass },
  });

  const categoryLabel = CATEGORY_LABELS[category] ?? category;
  const subject = `【ねこネコ市】${categoryLabel} – ${name.trim()} 様よりお問い合わせ`;

  try {
    await transporter.sendMail({
      from: `"ねこネコ市 お問い合わせフォーム" <${gmailUser}>`,
      to: gmailUser,
      replyTo: `"${name.trim()}" <${email.trim()}>`,
      subject,
      html: buildHtml({
        name: name.trim(),
        email: email.trim(),
        phone: (phone ?? "").trim(),
        category,
        message: message.trim(),
      }),
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("nodemailer error:", err);
    return Response.json(
      { error: "メール送信に失敗しました。しばらく経ってからお試しください。" },
      { status: 500 }
    );
  }
}
