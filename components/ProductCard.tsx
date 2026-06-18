// components/ProductCard.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from './CartContext';
import axios from 'axios';

type Product = {
  productID: string;
  title: string;
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  stock?: number;
  colors?: string;
  sizes?: string;
  customFields?: Record<string, any>;
};

let cachedSchemas: any[] | null = null;

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [schemas, setSchemas] = useState<any[]>(cachedSchemas || []);

  useEffect(() => {
    if (!cachedSchemas) {
      axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001"}/api/schema`).then(res => {
        cachedSchemas = res.data;
        setSchemas(res.data);
      }).catch(err => console.error(err));
    }
  }, []);

  const imageUrl = product.images?.[0] || 'https://placehold.co/600x600/png?text=No+Image+Available';
  const hasSale = product.salePrice && product.salePrice > 0 && product.salePrice < product.price;
  const discountPercent = hasSale 
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100) 
    : 0;

  const isOutOfStock = product.stock !== undefined && product.stock <= 0;

  return (
    <div className="bg-zinc-900/50 backdrop-blur-2xl border border-zinc-800/80 hover:border-pink-500/50 transition-all duration-300 rounded-3xl shadow-xl hover:shadow-[0_0_30px_rgba(219,39,119,0.15)] group relative overflow-hidden flex flex-col h-full">
      <figure className="relative bg-zinc-950 h-72 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/600x600/png?text=Image+Not+Found';
          }}
        />

        {hasSale && !isOutOfStock && (
          <div className="absolute top-4 left-4 bg-pink-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg border border-pink-500">
            -{discountPercent}%
          </div>
        )}

        {isOutOfStock && (
          <div className="absolute top-4 left-4 bg-zinc-800 text-zinc-300 text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg border border-zinc-700">
            OUT OF STOCK
          </div>
        )}
      </figure>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white line-clamp-2 leading-tight group-hover:text-pink-400 transition-colors">{product.title}</h3>
        
        {product.subcategory && (
          <p className="text-sm text-zinc-400 font-medium mt-1">{product.subcategory}</p>
        )}

        <div className="mt-3 space-y-1">
          {/* Dynamic CMS Fields for Card */}
          {schemas.filter(s => s.showOnCard).map(s => {
            const val = product.customFields?.[s.name];
            if (!val) return null;
            return (
              <p key={s._id} className="text-xs text-zinc-500 font-semibold tracking-wide">
                <span className="text-zinc-600">{s.label}:</span> {s.type === 'boolean' && val ? 'Yes' : val}
              </p>
            );
          })}
        </div>

        <div className="mt-auto pt-6 flex items-end justify-between">
          <div className="flex flex-col">
            {hasSale ? (
              <>
                <span className="text-zinc-500 line-through text-sm font-medium">৳{product.price}</span>
                <span className="text-2xl font-black text-white">৳{product.salePrice}</span>
              </>
            ) : (
              <span className="text-2xl font-black text-white">৳{product.price}</span>
            )}
          </div>

          <div className="flex gap-2">
            {!isOutOfStock && (
              <button
                onClick={(e) => { e.preventDefault(); addToCart(product as any); }}
                className="w-10 h-10 rounded-2xl bg-zinc-800 hover:bg-pink-600 flex items-center justify-center text-white transition-colors border border-zinc-700 hover:border-pink-500"
                title="Add to Cart"
              >
                <ShoppingCart size={18} />
              </button>
            )}
            <Link
              href={`/product/${product.productID}?category=${product.category}`}
              className="px-4 py-2 bg-white text-black font-bold rounded-2xl hover:bg-zinc-200 transition-colors flex items-center justify-center"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}