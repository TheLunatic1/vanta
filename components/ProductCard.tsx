// components/ProductCard.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';

type Product = {
  productID: string;
  title: string;
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  category: string;
  variants: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const imageUrl = product.images && product.images.length > 0 
    ? product.images[0] 
    : 'https://placehold.co/600x600/png?text=No+Image+Available';

  return (
    <div className="card bg-base-100 border border-base-300 hover:border-primary transition-all group">
      <figure className="relative">
        <Image
          src={imageUrl}
          alt={product.title}
          width={400}
          height={400}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/600x600/png?text=Image+Not+Found';
          }}
        />
        {product.salePrice && (
          <div className="absolute top-4 right-4 badge badge-error text-white">SALE</div>
        )}
      </figure>

      <div className="card-body p-5">
        <h3 className="card-title text-lg font-semibold line-clamp-2">{product.title}</h3>
        <p className="text-sm text-base-content/70 line-clamp-2">{product.description}</p>

        <div className="flex items-baseline gap-3 mt-3">
          {product.salePrice ? (
            <>
              <span className="text-2xl font-bold">৳{product.salePrice}</span>
              <span className="text-base-content/50 line-through">৳{product.price}</span>
            </>
          ) : (
            <span className="text-2xl font-bold">৳{product.price}</span>
          )}
        </div>

        <div className="card-actions mt-6">
          <Link
            href={`/product/${product.productID}`}
            className="btn btn-primary btn-block"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}