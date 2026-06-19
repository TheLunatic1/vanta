import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import { ArrowRight, Sparkles } from 'lucide-react';

async function getSettings() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001"}/api/settings`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function Home() {
  const settings = await getSettings();
  const trustSignals = settings?.trustSignals || [
    { text: 'FREE SHIPPING OVER ৳3000', icon: 'Truck' },
    { text: '15 DAYS EASY RETURN', icon: 'ShieldCheck' }
  ];
  return (
    <div className="bg-black min-h-screen">
      {/* HERO SECTION - Hardcoded Background */}
      <div 
        className="relative min-h-[90vh] flex items-center justify-center px-4 py-12 overflow-hidden"
      >
        <div 
          className="absolute inset-0 z-0 opacity-40 mix-blend-screen"
          style={{
            backgroundImage: `url('https://i.imgur.com/zfEhvrR.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-0"></div>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-pink-600/30 rounded-full blur-[150px] pointer-events-none z-0"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[150px] pointer-events-none z-0"></div>

        <div className="max-w-5xl mx-auto text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800/80 bg-zinc-900/50 backdrop-blur-md mb-8 text-sm font-medium text-zinc-300">
            <Sparkles size={16} className="text-pink-500" /> Discover the new VantaRozze collection
          </div>

          <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-600 mb-6 leading-[0.9]">
            VANTA
          </h1>
          
          <p className="text-xl sm:text-2xl md:text-3xl text-zinc-400 mb-12 max-w-2xl mx-auto font-medium">
            Bold. Premium. Fearless.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center px-4 mb-16">
            <Link
              href="/products?category=Men"
              className="w-full sm:w-auto bg-white text-black hover:bg-zinc-200 focus:ring-4 focus:ring-zinc-500 text-lg font-black px-12 py-5 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              Shop VantaBlack
            </Link>
            <Link
              href="/products?category=Women"
              className="w-full sm:w-auto bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 text-white hover:border-pink-500 hover:text-pink-400 focus:ring-4 focus:ring-pink-500/50 text-lg font-black px-12 py-5 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(219,39,119,0.2)]"
            >
              Shop VantaRozze
            </Link>
          </div>

          {/* Trust Signals */}
          <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-zinc-400 uppercase tracking-widest">
            {trustSignals.map((signal: any, idx: number) => {
              const IconComponent = (LucideIcons as any)[signal.icon] || LucideIcons.Check;
              return (
                <div key={idx} className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-zinc-900 border border-zinc-800">
                    <IconComponent size={18} className="text-white" />
                  </div>
                  {signal.text}
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Category Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-pink-600/10 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          
          <Link href="/products?category=Men" className="group h-[500px] block">
            <div className="relative h-full bg-zinc-900/50 backdrop-blur-2xl border border-zinc-800/80 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:border-white/50 hover:shadow-[0_0_50px_rgba(255,255,255,0.1)] group-hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative h-full p-12 flex flex-col justify-end">
                <div className="mb-auto">
                  <div className="w-16 h-16 rounded-2xl bg-white text-black flex items-center justify-center font-black text-2xl mb-6 shadow-xl">B</div>
                  <p className="text-xl text-zinc-400 font-medium">For Men</p>
                </div>
                <div>
                  <h2 className="text-5xl font-black text-white tracking-tight mb-4 group-hover:scale-[1.02] origin-left transition-transform duration-500">VantaBlack</h2>
                  <div className="flex items-center gap-3 text-white text-lg font-bold">
                    Shop Collection <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/products?category=Women" className="group h-[500px] block md:-translate-y-8">
            <div className="relative h-full bg-zinc-900/50 backdrop-blur-2xl border border-zinc-800/80 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:border-pink-500/50 hover:shadow-[0_0_50px_rgba(219,39,119,0.15)] group-hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative h-full p-12 flex flex-col justify-end">
                <div className="mb-auto">
                  <div className="w-16 h-16 rounded-2xl bg-pink-500 text-white flex items-center justify-center font-black text-2xl mb-6 shadow-[0_10px_30px_rgba(219,39,119,0.3)]">R</div>
                  <p className="text-xl text-pink-500/80 font-medium">For Women</p>
                </div>
                <div>
                  <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-pink-500 tracking-tight mb-4 group-hover:scale-[1.02] origin-left transition-transform duration-500">VantaRozze</h2>
                  <div className="flex items-center gap-3 text-pink-400 text-lg font-bold">
                    Shop Collection <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/products?category=Others" className="group h-[500px] block">
            <div className="relative h-full bg-zinc-900/50 backdrop-blur-2xl border border-zinc-800/80 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:border-emerald-500/50 hover:shadow-[0_0_50px_rgba(16,185,129,0.1)] group-hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative h-full p-12 flex flex-col justify-end">
                <div className="mb-auto">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black text-2xl mb-6 shadow-[0_10px_30px_rgba(16,185,129,0.2)]">O</div>
                  <p className="text-xl text-emerald-500/80 font-medium">Accessories</p>
                </div>
                <div>
                  <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-500 tracking-tight mb-4 group-hover:scale-[1.02] origin-left transition-transform duration-500">Others</h2>
                  <div className="flex items-center gap-3 text-emerald-400 text-lg font-bold">
                    Shop Collection <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}