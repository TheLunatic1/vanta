// app/product/[productID]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/components/CartContext';

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
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string>('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${productID}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data);
        
        if (data.variants) {
          const firstVariant = data.variants.split(',')[0].trim();
          setSelectedVariant(firstVariant);
        }
      } catch (error) {
        console.error('Failed to fetch product', error);
      } finally {
        setLoading(false);
      }
    };

    if (productID) fetchProduct();
  }, [productID]);

  const handleAddToCart = () => {
    if (!product) return;
    
    const cartItem = {
      ...product,
      title: selectedVariant 
        ? `${product.title} - ${selectedVariant}` 
        : product.title,
    };
    
    addToCart(cartItem);
  };

  const handleWhatsApp = () => {
    if (!product) return;

    const variantText = selectedVariant ? `Variant: ${selectedVariant}` : '';

    const message = `Hi! I want to buy this from Vanta:\n\n` +
      `*${product.title}*\n` +
      `${variantText ? variantText + '\n' : ''}` +
      `Price: ৳${product.salePrice || product.price}\n` +
      `Category: ${product.category}\n` +
      `Product ID: ${product.productID}\n\n` +
      `Please confirm stock and delivery. Thank you!`;

    const whatsappUrl = `https://wa.me/8801612224639?text=${encodeURIComponent(message)}`;
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

  const variantsList = product.variants 
    ? product.variants.split(',').map(v => v.trim()).filter(Boolean) 
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <Link href="/products" className="flex items-center gap-2 text-base-content/70 hover:text-white mb-8">
        <ArrowLeft size={20} /> Back to All Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* === IMAGE GALLERY - Improved === */}
        <div>
          <div className="relative aspect-square bg-zinc-900 rounded-3xl overflow-hidden mb-6 shadow-2xl">
            <Image
              src={product.images[currentImageIndex] || 'https://placehold.co/600x600/png?text=No+Image+Available'}
              alt={product.title}
              fill
              className="object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/600x600/png?text=Image+Not+Found';
              }}
            />
          </div>

          {/* Thumbnails - Better responsive */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                    index === currentImageIndex 
                      ? 'border-primary scale-105' 
                      : 'border-transparent hover:border-base-300'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${index}`}
                    width={120}
                    height={120}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* === PRODUCT INFO === */}
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
            <p className="text-base-content/80 leading-relaxed whitespace-pre-line">{product.description}</p>
          </div>

          {/* Selectable Variants */}
          {variantsList.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Available Variants</h3>
              <div className="flex flex-wrap gap-3">
                {variantsList.map((variant, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-6 py-3 rounded-full border text-sm font-medium transition-all ${
                      selectedVariant === variant 
                        ? 'bg-primary text-white border-primary' 
                        : 'border-base-300 hover:border-primary hover:bg-base-200'
                    }`}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-8 flex flex-col gap-4">
            <button
              onClick={handleAddToCart}
              className="btn btn-primary btn-block text-lg h-16 text-white"
              disabled={!selectedVariant && variantsList.length > 0}
            >
              <ShoppingCart size={26} />
              Add to Cart {selectedVariant && `(${selectedVariant})`}
            </button>

            <button
              onClick={handleWhatsApp}
              className="btn btn-outline btn-block text-lg h-16"
            >
              Order This Item on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}