"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001"}/api`;

export default function NewProduct() {
  const router = useRouter();
  const [schemas, setSchemas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<any>({
    productID: "",
    title: "",
    description: "",
    price: 0,
    salePrice: 0,
    category: "Men",
    subcategory: "",
    status: "Active",
    stock: 0,
    colors: "",
    sizes: "",
    images: "", // comma separated
    customFields: {}
  });

  useEffect(() => {
    const fetchSchemas = async () => {
      try {
        const res = await axios.get(`${API_URL}/schema`);
        setSchemas(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSchemas();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      images: formData.images.split(",").map((i: string) => i.trim()).filter((i:string) => i),
    };

    try {
      const token = localStorage.getItem("adminToken");
      await axios.post(`${API_URL}/products`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      router.push("/admin/products");
    } catch (error: any) {
      alert(error.response?.data?.message || "Error creating product");
    }
  };

  const handleCustomFieldChange = (name: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      customFields: { ...prev.customFields, [name]: value }
    }));
  };

  if (loading) return <div className="p-8 text-center"><span className="loading loading-spinner"></span></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 border-b border-base-200 pb-4">
        <Link href="/admin/products" className="btn btn-circle btn-ghost">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h2 className="text-3xl font-bold">Add New Product</h2>
          <p className="text-base-content/60">Fill out standard and dynamic fields.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Core Fields */}
        <div className="bg-zinc-900/50 backdrop-blur-2xl border border-zinc-800/80 rounded-3xl shadow-xl">
          <div className="p-8">
            <h3 className="text-xl font-bold text-white mb-6 border-b border-zinc-800 pb-3">Core Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-300 ml-1">Product ID (Unique)</label>
                <input type="text" className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 p-3 outline-none transition-all" required 
                  value={formData.productID} onChange={e => setFormData({...formData, productID: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-300 ml-1">Title</label>
                <input type="text" className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 p-3 outline-none transition-all" required 
                  value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-zinc-300 ml-1">Description</label>
                <textarea className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 p-3 h-24 outline-none transition-all" required
                  value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-300 ml-1">Regular Price ($)</label>
                <input type="number" step="0.01" className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 p-3 outline-none transition-all" required 
                  value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-300 ml-1">Sale Price ($)</label>
                <input type="number" step="0.01" className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 p-3 outline-none transition-all" 
                  value={formData.salePrice} onChange={e => setFormData({...formData, salePrice: parseFloat(e.target.value)})} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-300 ml-1">Category</label>
                <select className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 p-3 outline-none transition-all" required
                  value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-300 ml-1">Subcategory</label>
                <input type="text" className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 p-3 outline-none transition-all" 
                  value={formData.subcategory} onChange={e => setFormData({...formData, subcategory: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-300 ml-1">Stock</label>
                <input type="number" className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 p-3 outline-none transition-all" required 
                  value={formData.stock} onChange={e => setFormData({...formData, stock: parseInt(e.target.value) || 0})} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-300 ml-1">Status</label>
                <select className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 p-3 outline-none transition-all" required
                  value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-zinc-300 ml-1">Colors (Comma separated)</label>
                <input type="text" className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 p-3 outline-none transition-all" 
                  value={formData.colors} onChange={e => setFormData({...formData, colors: e.target.value})} />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-zinc-300 ml-1">Sizes (Comma separated)</label>
                <input type="text" className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 p-3 outline-none transition-all" 
                  value={formData.sizes} onChange={e => setFormData({...formData, sizes: e.target.value})} />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-zinc-300 ml-1">Images (Comma separated Imgbb URLs)</label>
                <input type="text" className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 p-3 outline-none transition-all" placeholder="https://i.ibb.co/123/img.jpg, https://i.ibb.co/456/img2.jpg"
                  value={formData.images} onChange={e => setFormData({...formData, images: e.target.value})} />
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic CMS Fields */}
        {schemas.length > 0 && (
          <div className="bg-zinc-900/50 backdrop-blur-2xl border border-pink-500/30 rounded-3xl shadow-xl">
            <div className="p-8">
              <h3 className="text-xl font-bold text-pink-500 mb-6 border-b border-zinc-800 pb-3">Dynamic Fields (CMS)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {schemas.map((s) => (
                  <div key={s._id} className="space-y-1.5">
                    <label className="text-sm font-medium text-zinc-300 ml-1">
                      {s.label} {s.required && <span className="text-pink-500">*</span>}
                    </label>
                    
                    {s.type === 'text' && (
                      <input type="text" className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 p-3 outline-none transition-all" required={s.required}
                        value={formData.customFields[s.name] || ''} onChange={e => handleCustomFieldChange(s.name, e.target.value)} />
                    )}
                    {s.type === 'number' && (
                      <input type="number" className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 p-3 outline-none transition-all" required={s.required}
                        value={formData.customFields[s.name] || ''} onChange={e => handleCustomFieldChange(s.name, parseFloat(e.target.value))} />
                    )}
                    {s.type === 'imageLink' && (
                      <input type="url" placeholder="Imgbb URL" className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 p-3 outline-none transition-all" required={s.required}
                        value={formData.customFields[s.name] || ''} onChange={e => handleCustomFieldChange(s.name, e.target.value)} />
                    )}
                    {s.type === 'boolean' && (
                      <div className="flex items-center h-12">
                        <input type="checkbox" className="w-5 h-5 rounded border-zinc-700 bg-zinc-900 text-pink-500 focus:ring-pink-500 focus:ring-offset-zinc-900"
                          checked={!!formData.customFields[s.name]} onChange={e => handleCustomFieldChange(s.name, e.target.checked)} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <button type="submit" className="w-full flex justify-center items-center gap-2 bg-white text-black hover:bg-zinc-200 focus:ring-4 focus:ring-zinc-500 font-bold rounded-2xl text-lg px-5 py-4 transition-all">
          <Save size={24} /> Save Product
        </button>
      </form>
    </div>
  );
}
