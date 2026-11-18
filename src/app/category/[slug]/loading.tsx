export default function Loading() {
  return (
    <div className="page-shell animate-pulse">
      <div className="category-banner">
        <div className="h-3 w-24 rounded bg-line dark:bg-white/10" />
        <div className="mt-4 h-10 w-56 rounded bg-line dark:bg-white/10" />
      </div>
      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i}>
            <div className="aspect-[16/10] bg-line dark:bg-white/10" />
            <div className="mt-4 h-5 rounded bg-line dark:bg-white/10" />
            <div className="mt-2 h-4 rounded bg-line dark:bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
