export default function Loading() {
  return (
    <>
      {/* Header skeleton */}
      <section className="bg-gradient-to-br from-paw-light via-ivory to-peach-pale py-16 px-4 text-center">
        <div className="h-4 w-36 bg-paw-light rounded mx-auto mb-3 animate-pulse" />
        <div className="h-8 w-64 bg-caramel-light rounded mx-auto mb-3 animate-pulse" />
        <div className="h-4 w-48 bg-caramel-light rounded mx-auto animate-pulse" />
      </section>

      <div className="bg-white border-b border-caramel-light h-10" />

      {/* Grid skeleton */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl overflow-hidden border border-caramel-light animate-pulse"
            >
              <div className="h-48 bg-caramel-light" />
              <div className="p-4 space-y-2">
                <div className="flex justify-between">
                  <div className="h-5 w-20 bg-caramel-light rounded" />
                  <div className="h-4 w-24 bg-caramel-light rounded-full" />
                </div>
                <div className="h-3 w-full bg-caramel-light rounded" />
                <div className="h-3 w-3/4 bg-caramel-light rounded" />
                <div className="flex gap-1.5 pt-1">
                  <div className="h-5 w-14 bg-paw-light rounded-full" />
                  <div className="h-5 w-16 bg-paw-light rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
