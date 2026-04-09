// app/cart/page.tsx
'use client';

import { useCart } from '@/components/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, ArrowLeft } from 'lucide-react';

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

    const whatsappUrl = `https://wa.me/8801612224639?text=${encodeURIComponent(message)}`; // ← Change this number to client's WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="text-8xl mb-6">🛒</div>
        <h2 className="text-4xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-zinc-400 mb-10 max-w-md">Add some awesome products from VantaBlack, VantaRozze or Others</p>
        <Link href="/products" className="btn btn-primary btn-lg">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-10">
        <div>
          <Link href="/products" className="flex items-center gap-2 text-base-content/70 hover:text-white mb-2">
            <ArrowLeft size={20} /> Continue Shopping
          </Link>
          <h1 className="text-4xl font-bold">Your Cart</h1>
        </div>
        <button 
          onClick={clearCart}
          className="btn btn-ghost text-red-500 hover:bg-red-500/10"
        >
          Clear Cart
        </button>
      </div>

      <div className="space-y-6 mb-12">
        {cart.map((item) => (
          <div key={item.productID} className="flex gap-6 bg-base-200 p-6 rounded-2xl">
            <div className="w-28 h-28 bg-zinc-800 rounded-xl overflow-hidden shrink-0">
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.title}
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                />
              )}
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-base-content/70">৳{item.price} × {item.quantity}</p>
              <p className="font-bold mt-1">Subtotal: ৳{item.price * item.quantity}</p>
            </div>

            <button
              onClick={() => removeFromCart(item.productID)}
              className="text-red-500 hover:text-red-600 self-start"
            >
              <Trash2 size={22} />
            </button>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="bg-base-200 p-8 rounded-3xl">
        <div className="flex justify-between text-2xl font-bold mb-8">
          <span>Total Amount</span>
          <span>৳{getTotalPrice()}</span>
        </div>

        <button
          onClick={handleWhatsAppOrder}
          className="btn btn-primary btn-block text-lg h-16 text-white"
        >
          Send Full Order on WhatsApp
        </button>

        <p className="text-center text-sm text-base-content/60 mt-4">
          You will be redirected to WhatsApp with complete order details
        </p>
      </div>
    </div>
  );
}