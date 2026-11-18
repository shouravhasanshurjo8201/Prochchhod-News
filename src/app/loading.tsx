export default function Loading() {
  return (
    <div className="page-shell animate-pulse">
      <div className="h-12 border-b border-line dark:border-white/10" />
      <div className="my-7 h-4 w-44 rounded bg-line dark:bg-white/10" />
      <div className="grid gap-8 lg:grid-cols-[1.7fr_1fr]">
        <div>
          <div className="aspect-[16/9] rounded-sm bg-line dark:bg-white/10" />
          <div className="mt-5 h-7 max-w-2xl rounded bg-line dark:bg-white/10" />
          <div className="mt-3 h-4 max-w-xl rounded bg-line dark:bg-white/10" />
        </div>
        <div className="space-y-5">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex gap-4">
              <div className="aspect-[4/3] w-32 shrink-0 rounded-sm bg-line dark:bg-white/10" />
              <div className="flex-1 space-y-3">
                <div className="h-4 w-20 rounded bg-line dark:bg-white/10" />
                <div className="h-5 rounded bg-line dark:bg-white/10" />
                <div className="h-4 rounded bg-line dark:bg-white/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item}>
            <div className="aspect-[16/10] rounded-sm bg-line dark:bg-white/10" />
            <div className="mt-4 h-5 rounded bg-line dark:bg-white/10" />
            <div className="mt-2 h-4 rounded bg-line dark:bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
