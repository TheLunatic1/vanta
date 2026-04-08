import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <>
      {/* Hero */}
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        <div className="text-center z-10 px-6">
          <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-white mb-6">
            VANTA
          </h1>
          <p className="text-3xl text-zinc-400 mb-12 max-w-lg mx-auto">
            Bold streetwear for the fearless
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products?category=Men"
              className="btn btn-lg bg-white text-black hover:bg-zinc-200 text-xl font-semibold px-12"
            >
              Shop VantaBlack
            </Link>
            <Link
              href="/products?category=Women"
              className="btn btn-lg border-2 border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white text-xl font-semibold px-12"
            >
              Shop VantaRozze
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Categories */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-8">
        <Link href="/products?category=Men" className="group">
          <div className="card bg-zinc-900 text-white hover:bg-black transition-all duration-300 border border-zinc-800">
            <div className="card-body items-center text-center py-16">
              <h2 className="text-6xl font-bold">VantaBlack</h2>
              <p className="text-xl text-zinc-400">For Men</p>
              <div className="mt-8 flex items-center gap-3 text-pink-400 group-hover:gap-5 transition-all">
                Shop Now <ArrowRight size={28} />
              </div>
            </div>
          </div>
        </Link>

        <Link href="/products?category=Women" className="group">
          <div className="card bg-zinc-900 text-white hover:bg-black transition-all duration-300 border border-zinc-800">
            <div className="card-body items-center text-center py-16">
              <h2 className="text-6xl font-bold text-pink-400">VantaRozze</h2>
              <p className="text-xl text-zinc-400">For Women</p>
              <div className="mt-8 flex items-center gap-3 text-pink-400 group-hover:gap-5 transition-all">
                Shop Now <ArrowRight size={28} />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}