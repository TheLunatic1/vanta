// app/products/ProductsContent.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { Search } from 'lucide-react';

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

export default function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get('category') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`;
        if (categoryFilter) {
          url += `?category=${categoryFilter}`;
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch');
        
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryFilter]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <h1 className="text-4xl font-bold">
          {categoryFilter 
            ? categoryFilter === 'Men' 
              ? 'VantaBlack' 
              : categoryFilter === 'Women' 
                ? 'VantaRozze' 
                : categoryFilter === 'Others' 
                  ? 'Others' 
                  : 'All Products'
            : 'All Products'}
        </h1>

        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full pl-12"
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-base-content/60" size={20} />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.productID} product={product} />
          ))}
        </div>
      )}

      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-20 text-xl text-base-content/60">
          No products found matching your search.
        </div>
      )}
    </div>
  );
}