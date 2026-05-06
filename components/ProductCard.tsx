// components/ProductCard.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from './CartContext';

type Product = {
  productID: string;
  title: string;
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  variants: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const imageUrl = product.images?.[0] || 'https://placehold.co/600x600/png?text=No+Image+Available';
  const hasSale = product.salePrice && product.salePrice > 0 && product.salePrice < product.price;
  const discountPercent = hasSale 
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100) 
    : 0;

  return (
    <div className="card bg-base-100 border border-base-300 hover:border-primary transition-all group relative overflow-hidden">
      <figure className="relative">
        <Image
          src={imageUrl}
          alt={product.title}
          width={400}
          height={400}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/600x600/png?text=Image+Not+Found';
          }}
        />

        {hasSale && (
          <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            -{discountPercent}% OFF
          </div>
        )}
      </figure>

      <div className="card-body p-5">
        <h3 className="card-title text-lg font-semibold line-clamp-2">{product.title}</h3>
        
        {product.subcategory && (
          <p className="text-sm text-primary font-medium">{product.subcategory}</p>
        )}

        <p className="text-sm text-base-content/70 line-clamp-2 min-h-10.5">{product.description}</p>

        <div className="flex items-baseline gap-3 mt-3">
          {hasSale ? (
            <>
              <span className="text-2xl font-bold">৳{product.salePrice}</span>
              <span className="text-base-content/50 line-through">৳{product.price}</span>
            </>
          ) : (
            <span className="text-2xl font-bold">৳{product.price}</span>
          )}
        </div>

        <div className="card-actions mt-6 flex gap-3">
          <Link
            href={`/product/${product.productID}?category=${product.category}`}
            className="flex-1 btn btn-outline btn-sm"
          >
            View Details
          </Link>
          
          <button
            onClick={() => addToCart(product)}
            className="flex-1 btn btn-primary btn-sm text-white"
          >
            <ShoppingCart size={18} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}