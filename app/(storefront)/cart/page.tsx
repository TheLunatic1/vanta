// app/cart/page.tsx
'use client';

import { useCart } from '@/components/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, ArrowLeft, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, clearCart, getTotalPrice } = useCart();

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;

    let message = `🚀 *New Order from Vanta Website*\n\n`;

    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.title}*\n`;
      message += `   Quantity: ${item.quantity}\n`;
      message += `   Price: ৳${item.price}\n`;
      message += `   Subtotal: ৳${item.price * item.quantity}\n\n`;
    });

    message += `──────────────────\n`;
    message += `*Total Amount: ৳${getTotalPrice()}*\n\n`;
    message += `Please confirm the order and delivery details. Thank you! 🙏`;

    const whatsappUrl = `https://wa.me/8801612224639?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[85vh] flex flex-col items-center justify-center text-center px-6 bg-black relative overflow-hidden">
        {/* Background Glow Effects */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="text-8xl mb-6 drop-shadow-[0_0_30px_rgba(219,39,119,0.3)]">🛒</div>
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500 tracking-tight mb-4">Your Cart is Empty</h2>
          <p className="text-zinc-400 font-medium mb-10 max-w-md text-lg">Looks like you haven't added anything to your cart yet.</p>
          <Link href="/products" className="group flex items-center justify-center gap-2 bg-white text-black hover:bg-zinc-200 focus:ring-4 focus:ring-zinc-500 font-bold rounded-2xl text-lg px-8 py-4 transition-all">
            Start Shopping
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] bg-black relative overflow-hidden py-12 px-4">
      {/* Background Glow Effects */}
      <div className="absolute top-0 -left-20 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 -right-20 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
          <div>
            <Link href="/products" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-3 font-medium transition-colors">
              <ArrowLeft size={20} /> Continue Shopping
            </Link>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Your Cart</h1>
          </div>
          <button 
            onClick={clearCart}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 px-4 py-2 rounded-xl transition-colors font-medium self-start sm:self-auto"
          >
            <Trash2 size={18} /> Clear Cart
          </button>
        </div>

        <div className="space-y-6 mb-12">
          {cart.map((item) => (
            <div key={item.productID} className="flex flex-col sm:flex-row gap-6 bg-zinc-900/50 backdrop-blur-2xl border border-zinc-800/80 p-6 rounded-3xl shadow-xl hover:border-zinc-700 transition-colors">
              <div className="w-full sm:w-32 h-40 sm:h-32 bg-zinc-950 rounded-2xl overflow-hidden shrink-0 border border-zinc-800">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-700 font-medium">No Image</div>
                )}
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <h3 className="font-bold text-xl text-white mb-1">{item.title}</h3>
                <p className="text-zinc-400 font-medium">৳{item.price} × {item.quantity}</p>
                <div className="mt-auto pt-4 sm:pt-0">
                  <p className="font-black text-pink-400 text-lg">Subtotal: ৳{item.price * item.quantity}</p>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.productID)}
                className="w-12 h-12 rounded-2xl flex items-center justify-center bg-zinc-950/50 border border-zinc-800 text-red-500 hover:text-white hover:bg-red-500 hover:border-red-500 transition-all self-end sm:self-center shrink-0"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-zinc-900/50 backdrop-blur-2xl border border-zinc-800/80 p-8 rounded-3xl shadow-2xl">
          <div className="flex justify-between items-center text-2xl md:text-3xl font-black text-white mb-8 border-b border-zinc-800 pb-6">
            <span>Total Amount</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">৳{getTotalPrice()}</span>
          </div>

          <button
            onClick={handleWhatsAppOrder}
            className="w-full flex items-center justify-center gap-3 bg-white text-black hover:bg-zinc-200 focus:ring-4 focus:ring-zinc-500 font-black rounded-2xl text-lg px-5 py-5 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.15)] group"
          >
            Send Full Order on WhatsApp
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-center text-sm text-zinc-500 font-medium mt-6 flex items-center justify-center gap-2">
            You will be redirected to WhatsApp with complete order details
          </p>
        </div>
      </div>
    </div>
  );
}