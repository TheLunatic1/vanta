export default function ProductCardSkeleton() {
  return (
    <div className="card bg-base-100 border border-base-300 animate-pulse">
      <figure className="relative">
        <div className="w-full h-64 bg-zinc-700"></div>
      </figure>

      <div className="card-body p-5 space-y-4">
        <div className="h-6 bg-zinc-700 rounded w-4/5"></div>
        <div className="h-4 bg-zinc-700 rounded w-1/2"></div>
        <div className="h-4 bg-zinc-700 rounded w-full"></div>
        <div className="h-4 bg-zinc-700 rounded w-3/4"></div>

        <div className="flex items-center gap-3 pt-3">
          <div className="h-8 bg-zinc-700 rounded w-24"></div>
        </div>

        <div className="flex gap-3 mt-6">
          <div className="flex-1 h-10 bg-zinc-700 rounded-xl"></div>
          <div className="flex-1 h-10 bg-zinc-700 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}