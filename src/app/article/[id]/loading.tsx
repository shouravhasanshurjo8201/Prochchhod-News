export default function Loading() {
  return (
    <div className="page-shell article-shell animate-pulse">
      <div className="h-4 w-44 rounded bg-line dark:bg-white/10" />
      <div className="article-header mt-8 space-y-4">
        <div className="h-10 rounded bg-line dark:bg-white/10" />
        <div className="h-10 max-w-4xl rounded bg-line dark:bg-white/10" />
        <div className="h-5 max-w-3xl rounded bg-line dark:bg-white/10" />
      </div>
      <div className="mt-8 aspect-[16/9] bg-line dark:bg-white/10" />
      <div className="mx-auto mt-10 max-w-2xl space-y-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="h-5 rounded bg-line dark:bg-white/10" />
        ))}
      </div>
    </div>
  );
}
