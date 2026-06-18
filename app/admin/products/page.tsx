"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";

const API_URL = "http://localhost:5001/api";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/products`);
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${API_URL}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div className="text-center p-8"><span className="loading loading-spinner"></span></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Products</h2>
          <p className="text-base-content/60">Manage your store's inventory.</p>
        </div>
        <Link href="/admin/products/new" className="px-5 py-2.5 flex items-center gap-2 rounded-xl font-bold bg-white text-black hover:bg-zinc-200 transition-colors">
          <Plus size={20} /> Add Product
        </Link>
      </div>

      <div className="bg-zinc-900/50 backdrop-blur-2xl border border-zinc-800/80 rounded-3xl shadow-xl">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id}>
                    <td className="font-mono text-sm">{p.productID}</td>
                    <td>
                      <div className="avatar">
                        <div className="w-12 h-12 rounded border border-base-300">
                          <img src={p.images?.[0] || 'https://via.placeholder.com/150'} alt={p.title} />
                        </div>
                      </div>
                    </td>
                    <td className="font-bold">{p.title}</td>
                    <td>${p.price.toFixed(2)}</td>
                    <td><div className="badge badge-outline">{p.category}</div></td>
                    <td>
                      <div className={`badge ${p.status === 'Active' ? 'badge-success' : 'badge-ghost'}`}>
                        {p.status}
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        {/* Currently not implementing edit form, but this is where it'd link */}
                        <Link href={`/admin/products/edit/${p.productID}`} className="btn btn-sm btn-ghost text-info"><Edit size={16}/></Link>
                        <button onClick={() => handleDelete(p.productID)} className="btn btn-sm btn-ghost text-error"><Trash2 size={16}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {products.length === 0 && <div className="text-center py-8">No products found.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
