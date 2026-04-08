'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from './CartContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();

  return (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-2xl flex items-center justify-center text-black font-bold text-3xl">V</div>
            <span className="font-black text-3xl tracking-tighter">VANTA</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-lg">
            <Link href="/" className="hover:text-pink-400 transition-colors">Home</Link>
            <Link href="/products?category=Men" className="hover:text-white transition-colors">VantaBlack</Link>
            <Link href="/products?category=Women" className="hover:text-pink-400 transition-colors">VantaRozze</Link>
            <Link href="/products?category=Others" className="hover:text-emerald-400 transition-colors">Others</Link>
            <Link href="/products" className="hover:text-white transition-colors font-medium">Shop All</Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-6">
            <Link href="/cart" className="relative flex items-center gap-2 hover:text-pink-400 transition-colors">
              <ShoppingCart size={26} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {cart.length}
                </span>
              )}
            </Link>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-6 border-t border-zinc-800">
            <div className="flex flex-col gap-6 text-lg pt-6">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link href="/products?category=Men" onClick={() => setIsMenuOpen(false)}>VantaBlack (Men)</Link>
              <Link href="/products?category=Women" onClick={() => setIsMenuOpen(false)}>VantaRozze (Women)</Link>
              <Link href="/products?category=Others" onClick={() => setIsMenuOpen(false)}>Others</Link>
              <Link href="/products" onClick={() => setIsMenuOpen(false)}>Shop All</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}