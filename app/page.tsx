// app/page.tsx
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <>
      {/* HERO SECTION - Fully Responsive */}
      <div className="min-h-screen bg-black flex items-center justify-center relative px-4 py-12 md:py-0">
        <div className="max-w-5xl mx-auto text-center z-10">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white mb-6 leading-none">
            VANTA
          </h1>
          
          <p className="text-xl sm:text-2xl md:text-3xl text-zinc-400 mb-10 max-w-lg mx-auto px-4">
            Bold streetwear for the fearless
          </p>

          {/* Buttons - Stack on mobile, side by side on larger screens */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <Link
              href="/products?category=Men"
              className="btn btn-lg w-full sm:w-auto bg-white text-black hover:bg-zinc-200 text-xl font-semibold px-10 py-4 rounded-2xl"
            >
              Shop VantaBlack
            </Link>
            <Link
              href="/products?category=Women"
              className="btn btn-lg w-full sm:w-auto border-2 border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white text-xl font-semibold px-10 py-4 rounded-2xl"
            >
              Shop VantaRozze
            </Link>
          </div>

          <div className="mt-12 text-xs uppercase tracking-widest text-zinc-500 flex items-center justify-center gap-2">
            <div className="w-8 h-px bg-zinc-500"></div>
            SCROLL FOR MORE
            <div className="w-8 h-px bg-zinc-500"></div>
          </div>
        </div>
      </div>

      {/* CATEGORY SECTIONS - Responsive Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          {/* VantaBlack - Men */}
          <Link href="/products?category=Men" className="group">
            <div className="card bg-zinc-900 border border-zinc-800 hover:border-white transition-all duration-300 h-full">
              <div className="card-body p-8 md:p-12 flex flex-col justify-center items-center text-center min-h-[380px] md:min-h-[460px]">
                <h2 className="text-5xl md:text-6xl font-bold text-white mb-3">VantaBlack</h2>
                <p className="text-2xl text-zinc-400 mb-8">For Men</p>
                <div className="inline-flex items-center gap-3 text-pink-400 group-hover:gap-5 transition-all text-lg font-medium">
                  Shop Collection
                  <ArrowRight size={28} />
                </div>
              </div>
            </div>
          </Link>

          {/* VantaRozze - Women */}
          <Link href="/products?category=Women" className="group">
            <div className="card bg-zinc-900 border border-zinc-800 hover:border-pink-400 transition-all duration-300 h-full">
              <div className="card-body p-8 md:p-12 flex flex-col justify-center items-center text-center min-h-[380px] md:min-h-[460px]">
                <h2 className="text-5xl md:text-6xl font-bold text-pink-400 mb-3">VantaRozze</h2>
                <p className="text-2xl text-zinc-400 mb-8">For Women</p>
                <div className="inline-flex items-center gap-3 text-pink-400 group-hover:gap-5 transition-all text-lg font-medium">
                  Shop Collection
                  <ArrowRight size={28} />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}