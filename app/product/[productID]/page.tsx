// app/product/[productID]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
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

export default function ProductDetail() {
  const params = useParams();
  const productID = params.productID as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${productID}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error('Failed to fetch product', error);
      } finally {
        setLoading(false);
      }
    };

    if (productID) {
      fetchProduct();
    }
  }, [productID]);

  const handleWhatsApp = () => {
    if (!product) return;

    const message = `Hi! I want to buy this from Vanta:\n\n` +
      `*${product.title}*\n` +
      `Price: ৳${product.salePrice || product.price}\n` +
      `Category: ${product.category}\n` +
      `Product ID: ${product.productID}\n` +
      `Variants: ${product.variants || 'N/A'}\n\n` +
      `Please confirm stock and delivery. Thank you!`;

    const whatsappUrl = `https://wa.me/8801712345678?text=${encodeURIComponent(message)}`; // ← Change this number to your client's WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold mb-4">Product Not Found</h2>
        <Link href="/products" className="btn btn-primary">
          ← Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <Link href="/products" className="flex items-center gap-2 text-base-content/70 hover:text-white mb-8">
        <ArrowLeft size={20} /> Back to All Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <div className="relative aspect-square bg-zinc-900 rounded-3xl overflow-hidden mb-6">
            <Image
              src={product.images[currentImageIndex] || 'https://placehold.co/600x600?text=No+Image'}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-4">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    index === currentImageIndex ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${index}`}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div>
            <div className="badge badge-lg badge-neutral mb-3">{product.category}</div>
            <h1 className="text-4xl font-bold leading-tight">{product.title}</h1>
          </div>

          <div className="flex items-baseline gap-4">
            {product.salePrice ? (
              <>
                <span className="text-5xl font-bold">৳{product.salePrice}</span>
                <span className="text-2xl text-base-content/50 line-through">৳{product.price}</span>
              </>
            ) : (
              <span className="text-5xl font-bold">৳{product.price}</span>
            )}
          </div>

          <div>
            <h3 className="font-semibold mb-3">Description</h3>
            <p className="text-base-content/80 leading-relaxed">{product.description}</p>
          </div>

          {product.variants && (
            <div>
              <h3 className="font-semibold mb-3">Available Variants</h3>
              <div className="flex flex-wrap gap-2">
                {product.variants.split(',').map((variant, i) => (
                  <div key={i} className="badge badge-outline badge-lg">
                    {variant.trim()}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* WhatsApp Order Button */}
          <div className="pt-6">
            <button
              onClick={handleWhatsApp}
              className="btn btn-primary btn-block text-lg h-16 text-white"
            >
              <ShoppingCart size={26} />
              Order on WhatsApp
            </button>
            <p className="text-center text-xs text-base-content/60 mt-4">
              You will be redirected to WhatsApp to complete your order
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}