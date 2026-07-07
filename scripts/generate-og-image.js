// OGP 専用画像を生成するスクリプト。
// 実行: node scripts/generate-og-image.js
// top_picture.jpg を 1200×630 (1.91:1) に中央クロップして public/og-image.jpg を出力する。

const sharp = require("sharp");
const path = require("path");

const INPUT  = path.resolve(__dirname, "../public/top_picture.jpg");
const OUTPUT = path.resolve(__dirname, "../public/og-image.jpg");
const WIDTH  = 1200;
const HEIGHT = 630;

(async () => {
  const { width, height } = await sharp(INPUT).metadata();
  console.log(`Input:  ${width}×${height}`);

  await sharp(INPUT)
    .resize(WIDTH, HEIGHT, {
      fit: "cover",       // アスペクト比を保ちながら 1200×630 を完全に埋める
      position: "centre", // 中央を基準にクロップ
    })
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(OUTPUT);

  console.log(`Output: ${WIDTH}×${HEIGHT} → ${OUTPUT}`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
