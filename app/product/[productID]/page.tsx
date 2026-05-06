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
  subcategory?: string;
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

  // Magnifier
  const [isHovering, setIsHovering] = useState(false);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [zoomedPosition, setZoomedPosition] = useState({ x: 50, y: 50 });

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const lensSize = 90;
    const posX = Math.max(lensSize/2, Math.min(x, rect.width - lensSize/2));
    const posY = Math.max(lensSize/2, Math.min(y, rect.height - lensSize/2));

    setLensPosition({ x: posX, y: posY });

    const zoomX = (x / rect.width) * 100;
    const zoomY = (y / rect.height) * 100;
    setZoomedPosition({ x: zoomX, y: zoomY });
  };

  const handleAddToCart = () => {
    if (!product) return;
    const cartItem = {
      ...product,
      title: selectedVariant ? `${product.title} - ${selectedVariant}` : product.title,
    };
    addToCart(cartItem);
  };

  const handleWhatsApp = () => {
    if (!product) return;
    const variantText = selectedVariant ? `Variant: ${selectedVariant}` : '';
    const message = `Hi! I want to buy:\n*${product.title}*\n${variantText}\nPrice: ৳${product.salePrice || product.price}\nCategory: ${product.category}\nProduct ID: ${product.productID}\n\nPlease confirm.`;
    window.open(`https://wa.me/8801712345678?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><span className="loading loading-spinner loading-lg"></span></div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center text-2xl">Product Not Found</div>;

  const variantsList = product.variants ? product.variants.split(',').map(v => v.trim()).filter(Boolean) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <Link href="/products" className="flex items-center gap-2 mb-8 text-base-content/70 hover:text-white">
        <ArrowLeft size={20} /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
        {/* Image Section */}
        <div>
          <div 
            className="relative aspect-square bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 cursor-crosshair"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onMouseMove={handleMouseMove}
          >
            <Image
              src={product.images[currentImageIndex] || 'https://placehold.co/600x600/png?text=No+Image+Available'}
              alt={product.title}
              fill
              className="object-contain p-8"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/600x600/png?text=Image+Not+Found';
              }}
            />

            {/* Lens */}
            {isHovering && (
              <div 
                className="absolute border-2 border-white/70 pointer-events-none rounded-md"
                style={{
                  width: '90px',
                  height: '90px',
                  left: `${lensPosition.x - 45}px`,
                  top: `${lensPosition.y - 45}px`,
                }}
              />
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-5 gap-3 mt-6">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                    index === currentImageIndex ? 'border-primary scale-105' : 'border-transparent hover:border-zinc-700'
                  }`}
                >
                  <Image src={img} alt="" width={100} height={100} className="object-cover w-full h-full" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info + Floating Zoomed View */}
        <div className="space-y-8 relative">
          {/* Floating Zoomed View - 30% Larger & 50% More Zoom */}
          {isHovering && (
            <div className="absolute -right-12 top-12 hidden xl:block w-96 h-96 border-4 border-white/80 bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl z-50">
              <Image
                src={product.images[currentImageIndex] || 'https://placehold.co/600x600/png?text=No+Image+Available'}
                alt={product.title}
                fill
                className="object-contain"
                style={{
                  transform: `scale(4.2)`,           // 50% more zoom
                  transformOrigin: `${zoomedPosition.x}% ${zoomedPosition.y}%`
                }}
              />
            </div>
          )}

          <div className="flex gap-2">
            <div className="badge badge-lg badge-neutral">{product.category}</div>
            {product.subcategory && (
              <div className="badge badge-lg bg-zinc-700 text-white border-none">{product.subcategory}</div>
            )}
          </div>

          <h1 className="text-4xl font-bold leading-tight">{product.title}</h1>

          <div className="flex items-baseline gap-4">
            {product.salePrice && product.salePrice < product.price ? (
              <>
                <span className="text-5xl font-bold">৳{product.salePrice}</span>
                <span className="text-2xl line-through text-base-content/50">৳{product.price}</span>
              </>
            ) : (
              <span className="text-5xl font-bold">৳{product.price}</span>
            )}
          </div>

          <div>
            <h3 className="font-semibold mb-3">Description</h3>
            <p className="text-base-content/80 leading-relaxed">{product.description}</p>
          </div>

          {variantsList.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Select Variant</h3>
              <div className="flex flex-wrap gap-3">
                {variantsList.map((variant, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-6 py-3 rounded-full border text-sm font-medium transition-all ${
                      selectedVariant === variant 
                        ? 'bg-primary text-white border-primary shadow-md' 
                        : 'border-zinc-700 hover:border-primary hover:bg-zinc-900'
                    }`}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pt-6 flex flex-col gap-4">
            <button
              onClick={handleAddToCart}
              className="btn btn-primary btn-block text-lg h-16"
              disabled={!selectedVariant && variantsList.length > 0}
            >
              <ShoppingCart size={26} /> Add to Cart
            </button>

            <button
              onClick={handleWhatsApp}
              className="btn btn-outline btn-block text-lg h-16"
            >
              Order on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}