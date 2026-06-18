export default function ProductCardSkeleton() {
  return (
    <div className="bg-zinc-900/50 backdrop-blur-2xl border border-zinc-800/80 rounded-3xl overflow-hidden flex flex-col h-full animate-pulse shadow-xl">
      <div className="relative bg-zinc-950 p-6 flex justify-center items-center h-72">
        <div className="w-full h-full bg-zinc-800/50 rounded-2xl"></div>
      </div>

      <div className="p-6 flex flex-col flex-grow space-y-4">
        <div className="space-y-2">
          <div className="h-6 bg-zinc-800 rounded-lg w-4/5"></div>
          <div className="h-4 bg-zinc-800 rounded-lg w-1/3"></div>
        </div>

        <div className="space-y-2 mt-4">
          <div className="h-3 bg-zinc-800 rounded-lg w-full"></div>
          <div className="h-3 bg-zinc-800 rounded-lg w-3/4"></div>
        </div>

        <div className="mt-auto pt-6 flex items-end justify-between">
          <div className="h-8 bg-zinc-800 rounded-lg w-20"></div>

          <div className="flex gap-2">
            <div className="w-10 h-10 bg-zinc-800 rounded-2xl"></div>
            <div className="w-20 h-10 bg-zinc-800 rounded-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}