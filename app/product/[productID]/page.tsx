'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, MessageCircle, ShoppingCart } from 'lucide-react';
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
  colors?: string;
  sizes?: string;
  stock?: number;
  variants: string;
};

export default function ProductDetail() {
  const params = useParams();
  const productID = params.productID as string;
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');

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
        
        if (data.colors) setSelectedColor(data.colors.split(',')[0].trim());
        if (data.sizes) setSelectedSize(data.sizes.split(',')[0].trim());
      } catch (error) {
        console.error('Failed to fetch product', error);
      } finally {
        setLoading(false);
      }
    };

    if (productID) fetchProduct();
  }, [productID]);

  const isOutOfStock = product?.stock !== undefined && product.stock <= 0;

  const handleAddToCart = () => {
    if (!product || isOutOfStock) return;
    const variantName = [selectedColor, selectedSize].filter(Boolean).join(' - ');
    const cartItem = {
      ...product,
      title: variantName ? `${product.title} (${variantName})` : product.title,
      selectedColor,
      selectedSize,
    };
    addToCart(cartItem);
  };

  const handleWhatsApp = () => {
    if (!product) return;

    let message = '';

    if (isOutOfStock) {
      message = `Hello Vanta!\n\n` +
        `I saw the product "${product.title}" is currently out of stock.\n` +
        `When will this come back in stock?\n\n` +
        `Product ID: ${product.productID}\n` +
        `Please let me know. Thank you!`;
    } else {
      const colorText = selectedColor ? `Color: ${selectedColor}` : '';
      const sizeText = selectedSize ? `Size: ${selectedSize}` : '';
      const price = product.salePrice && product.salePrice < product.price 
        ? product.salePrice 
        : product.price;

      message = `Hello Vanta!\n\n` +
        `I would like to order:\n\n` +
        `${product.title}\n` +
        `${product.subcategory ? `Category: ${product.subcategory}\n` : ''}` +
        `${colorText}\n` +
        `${sizeText}\n` +
        `Price: ৳${price}\n` +
        `Product ID: ${product.productID}\n\n` +
        `Please confirm availability and delivery charge. Thank you!`;
    }

    const phoneNumber = "8801712345678"; // Change this if needed
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><span className="loading loading-spinner loading-lg"></span></div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center text-2xl">Product Not Found</div>;

  const colorsList = product.colors ? product.colors.split(',').map(c => c.trim()).filter(Boolean) : [];
  const sizesList = product.sizes ? product.sizes.split(',').map(s => s.trim()).filter(Boolean) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <Link href={`/products?category=${product.category}`} className="flex items-center gap-2 mb-8 text-base-content/70 hover:text-white">
        <ArrowLeft size={20} /> Back to {product.category === 'Men' ? 'VantaBlack' : product.category === 'Women' ? 'VantaRozze' : 'Shop'}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image + Magnifier */}
        <div>
          <div 
            className="relative aspect-square bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 cursor-crosshair"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onMouseMove={(e) => {
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
            }}
          >
            <Image
              src={product.images[currentImageIndex] || 'https://placehold.co/600x600/png?text=No+Image+Available'}
              alt={product.title}
              fill
              className="object-contain p-8"
              onError={(e) => (e.target as HTMLImageElement).src = 'https://placehold.co/600x600/png?text=Image+Not+Found'}
            />

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

        {/* Right Side */}
        <div className="space-y-8 relative">
          {isHovering && (
            <div className="absolute -right-8 top-8 hidden xl:block w-96 h-96 border-4 border-white/80 bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl z-50">
              <Image
                src={product.images[currentImageIndex]}
                alt={product.title}
                fill
                className="object-contain"
                style={{ transform: `scale(4.2)`, transformOrigin: `${zoomedPosition.x}% ${zoomedPosition.y}%` }}
              />
            </div>
          )}

          <div className="flex gap-2">
            <div className="badge badge-lg badge-neutral">{product.category}</div>
            {product.subcategory && <div className="badge badge-lg bg-zinc-700 text-white border-none">{product.subcategory}</div>}
          </div>

          <h1 className="text-4xl font-bold leading-tight">{product.title}</h1>

          {/* Stock Status */}
          {isOutOfStock ? (
            <div className="badge badge-lg badge-error text-white">OUT OF STOCK</div>
          ) : product.stock !== undefined && (
            <div className="text-sm text-emerald-500 font-medium">✅ In Stock ({product.stock} available)</div>
          )}

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

          {/* Colors & Sizes */}
          {colorsList.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Color</h3>
              <div className="flex flex-wrap gap-2">
                {colorsList.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(color)}
                    className={`px-5 py-2.5 text-sm font-medium rounded-full border transition-all ${
                      selectedColor === color ? 'bg-primary text-white border-primary' : 'border-zinc-700 hover:border-primary hover:bg-zinc-900'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {sizesList.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {sizesList.map((size, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-2.5 text-sm font-medium rounded-full border transition-all min-w-13 text-center ${
                      selectedSize === size ? 'bg-primary text-white border-primary' : 'border-zinc-700 hover:border-primary hover:bg-zinc-900'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pt-8 flex flex-col gap-4">
            {!isOutOfStock && (
              <button
                onClick={handleAddToCart}
                className="btn btn-primary btn-block text-lg h-16"
                disabled={(colorsList.length > 0 && !selectedColor) || (sizesList.length > 0 && !selectedSize)}
              >
                <ShoppingCart size={26} /> Add to Cart
              </button>
            )}

            <button
              onClick={handleWhatsApp}
              className="btn btn-success btn-block text-lg h-16 flex items-center justify-center gap-2 text-white"
            >
              <MessageCircle size={26} />
              {isOutOfStock ? "Ask When Back in Stock" : "Order on WhatsApp"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}