"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Trash2, Edit2, LayoutTemplate, Layers } from "lucide-react";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001"}/api`;

export default function SchemaBuilder() {
  const [schemas, setSchemas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    label: "",
    type: "text",
    required: false,
    showOnCard: false,
    showOnPage: true,
  });

  const fetchSchemas = async () => {
    try {
      const res = await axios.get(`${API_URL}/schema`);
      setSchemas(res.data);
    } catch (error) {
      console.error("Failed to load schema", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchemas();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      await axios.post(`${API_URL}/schema`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchSchemas();
      setFormData({ name: "", label: "", type: "text", required: false, showOnCard: false, showOnPage: true });
    } catch (error) {
      console.error(error);
      alert("Failed to add field. Maybe name already exists.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? This will remove the field definition.")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${API_URL}/schema/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchSchemas();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div className="p-8 text-center"><span className="loading loading-spinner"></span></div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Schema Builder</h2>
        <p className="text-base-content/60">Dynamically add or remove fields from the product model.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Builder Form & List */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="bg-zinc-900/50 backdrop-blur-2xl border border-zinc-800/80 rounded-3xl shadow-xl">
            <div className="card-body">
              <h3 className="card-title text-xl mb-4 border-b border-base-200 pb-2"><Plus size={20}/> Add New Field</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-zinc-300 ml-1">Field ID (no spaces)</label>
                    <input type="text" placeholder="e.g. fabricType" className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 p-3 outline-none transition-all" 
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value.replace(/\s+/g, '')})} required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-zinc-300 ml-1">Display Label</label>
                    <input type="text" placeholder="e.g. Fabric Type" className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 p-3 outline-none transition-all" 
                      value={formData.label} onChange={e => setFormData({...formData, label: e.target.value})} required />
                  </div>
                </div>
                
                <div className="space-y-1.5 mt-4">
                  <label className="text-sm font-medium text-zinc-300 ml-1">Data Type</label>
                  <select className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 p-3 outline-none transition-all" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                    <option value="text">Text (String)</option>
                    <option value="number">Number</option>
                    <option value="boolean">Yes/No (Boolean)</option>
                    <option value="imageLink">Image Link (Imgbb)</option>
                  </select>
                </div>

                <div className="flex flex-wrap gap-6 pt-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input type="checkbox" className="peer appearance-none w-5 h-5 border border-zinc-700 bg-zinc-900 rounded checked:bg-pink-600 checked:border-pink-500 transition-all" 
                        checked={formData.required} onChange={e => setFormData({...formData, required: e.target.checked})} />
                      <div className="absolute opacity-0 peer-checked:opacity-100 text-white pointer-events-none">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">Required</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input type="checkbox" className="peer appearance-none w-5 h-5 border border-zinc-700 bg-zinc-900 rounded checked:bg-pink-600 checked:border-pink-500 transition-all" 
                        checked={formData.showOnCard} onChange={e => setFormData({...formData, showOnCard: e.target.checked})} />
                      <div className="absolute opacity-0 peer-checked:opacity-100 text-white pointer-events-none">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">Show on Card</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input type="checkbox" className="peer appearance-none w-5 h-5 border border-zinc-700 bg-zinc-900 rounded checked:bg-pink-600 checked:border-pink-500 transition-all" 
                        checked={formData.showOnPage} onChange={e => setFormData({...formData, showOnPage: e.target.checked})} />
                      <div className="absolute opacity-0 peer-checked:opacity-100 text-white pointer-events-none">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">Show on Page</span>
                  </label>
                </div>

                <button type="submit" className="w-full flex justify-center items-center gap-2 bg-white text-black hover:bg-zinc-200 focus:ring-4 focus:ring-zinc-500 font-bold rounded-2xl text-lg px-5 py-4 transition-all mt-6">Add Field</button>
              </form>
            </div>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-2xl border border-zinc-800/80 rounded-3xl shadow-xl">
            <div className="p-8">
               <h3 className="text-xl font-bold text-white mb-6 border-b border-zinc-800 pb-3 flex items-center gap-2"><Layers size={20}/> Active Custom Fields</h3>
               {schemas.length === 0 ? (
                 <div className="text-center py-6 text-zinc-500 font-medium">No custom fields added yet.</div>
               ) : (
                 <div className="overflow-x-auto rounded-2xl border border-zinc-800">
                   <table className="w-full text-left text-sm text-zinc-400">
                     <thead className="text-xs text-zinc-300 uppercase bg-zinc-950/50 border-b border-zinc-800">
                       <tr>
                         <th className="px-6 py-4">Label (ID)</th>
                         <th className="px-6 py-4">Type</th>
                         <th className="px-6 py-4">Visibility</th>
                         <th className="px-6 py-4 text-right">Actions</th>
                       </tr>
                     </thead>
                     <tbody>
                       {schemas.map((s, idx) => (
                         <tr key={s._id} className={`${idx !== schemas.length - 1 ? 'border-b border-zinc-800' : ''} bg-zinc-900/30 hover:bg-zinc-800/50 transition-colors`}>
                           <td className="px-6 py-4">
                             <div className="font-bold text-white text-base">{s.label}</div>
                             <div className="text-xs text-zinc-500 font-mono mt-0.5">{s.name}</div>
                           </td>
                           <td className="px-6 py-4">
                             <span className="px-3 py-1 rounded-full text-xs font-semibold border border-zinc-700 bg-zinc-800 text-zinc-300">{s.type}</span>
                           </td>
                           <td className="px-6 py-4">
                             <div className="flex gap-2">
                               {s.showOnCard && <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider bg-pink-500/10 text-pink-400 border border-pink-500/20">CARD</span>}
                               {s.showOnPage && <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">PAGE</span>}
                             </div>
                           </td>
                           <td className="px-6 py-4 text-right">
                             <button onClick={() => handleDelete(s._id)} className="p-2 rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                               <Trash2 size={18}/>
                             </button>
                           </td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
               )}
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="w-full lg:w-1/2">
           <div className="sticky top-8 space-y-6">
              
              <div className="bg-zinc-900/50 backdrop-blur-2xl border border-zinc-800/80 rounded-3xl shadow-xl overflow-hidden">
                <div className="p-8 border-b border-zinc-800 bg-zinc-950/30">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2"><LayoutTemplate size={20}/> Live Previews</h3>
                  <p className="text-sm text-zinc-400 mt-1">See how your custom fields will look.</p>
                </div>
                
                <div className="p-8 space-y-12">
                  
                  {/* Card Preview */}
                  <div>
                    <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4">Product Card</h4>
                    <div className="w-72 bg-zinc-900/80 border border-zinc-800 hover:border-pink-500/50 transition-all rounded-3xl shadow-xl overflow-hidden flex flex-col mx-auto">
                      <div className="h-48 bg-zinc-950 flex items-center justify-center text-zinc-700 font-medium">Product Image</div>
                      <div className="p-5 flex flex-col flex-grow">
                        <h3 className="text-lg font-bold text-white">Sample Product</h3>
                        <div className="mt-3 space-y-1">
                          {schemas.filter(s => s.showOnCard).map(s => (
                            <p key={s._id} className="text-xs text-zinc-500 font-semibold tracking-wide">
                              <span className="text-zinc-600">{s.label}:</span> {s.type === 'boolean' ? 'Yes' : 'Value'}
                            </p>
                          ))}
                          {formData.showOnCard && formData.label && (
                            <p className="text-xs text-pink-500 font-semibold tracking-wide">
                              <span className="text-pink-600">{formData.label}:</span> Preview
                            </p>
                          )}
                        </div>
                        <div className="mt-4 pt-4 border-t border-zinc-800/50">
                          <span className="text-xl font-black text-white">$99.00</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Product Card Preview ends above, removing Details Page Preview from here */}
                </div>
              </div>

           </div>
        </div>

      </div>

      {/* Full Page Details Preview */}
      <div className="pt-12 space-y-6 border-t border-zinc-800/50 mt-12">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-3"><LayoutTemplate className="text-pink-500" /> Full Page Product Preview</h2>
          <p className="text-base-content/60">This is exactly how your custom fields will look on the real product page.</p>
        </div>

        <div className="relative bg-black rounded-[3rem] overflow-hidden border border-zinc-800 shadow-2xl p-8 lg:p-12 max-w-6xl">
          {/* Mock Orbs */}
          <div className="absolute top-[-20%] left-[-10%] w-[40vw] h-[40vw] bg-pink-600/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10">
            {/* Back Button Mock */}
            <div className="flex items-center gap-2 mb-8 text-zinc-500">
               <span className="w-5 h-5 rounded-full bg-zinc-800"></span> Back to Shop
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left: Image Placeholder */}
              <div>
                <div className="aspect-square bg-zinc-900 rounded-3xl border border-zinc-800 flex items-center justify-center">
                  <span className="text-zinc-600 font-medium text-lg">Product Image</span>
                </div>
                <div className="grid grid-cols-5 gap-3 mt-6">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`aspect-square rounded-2xl bg-zinc-900 border ${i===0 ? 'border-pink-500' : 'border-zinc-800'}`}></div>
                  ))}
                </div>
              </div>

              {/* Right: Details */}
              <div className="space-y-8">
                <div className="flex gap-2">
                  <div className="px-4 py-1.5 rounded-full text-xs font-bold bg-zinc-800 text-zinc-300">Category</div>
                </div>

                <h1 className="text-4xl font-bold leading-tight text-white">Premium Sample Product</h1>

                <div className="text-sm text-emerald-500 font-medium">✅ In Stock (10 available)</div>

                <div>
                  <span className="text-5xl font-bold text-white">$99.00</span>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 text-white">Description</h3>
                  <p className="text-zinc-400 leading-relaxed">This is a beautiful preview of your product. Notice how the custom fields seamlessly integrate into the design below.</p>
                </div>

                {/* Dynamic Custom Fields */}
                <div className="space-y-3">
                  {schemas.filter(s => s.showOnPage).map(s => (
                    <div key={s._id} className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 p-5 rounded-2xl shadow-sm">
                      <h3 className="font-semibold text-zinc-500 text-sm mb-1.5 uppercase tracking-wide">{s.label}</h3>
                      <p className="text-white font-bold text-lg">{s.type === 'boolean' ? 'Yes' : 'Sample Value'}</p>
                    </div>
                  ))}
                  {formData.showOnPage && formData.label && (
                    <div className="bg-pink-900/10 backdrop-blur-md border border-pink-500/30 p-5 rounded-2xl shadow-[0_0_15px_rgba(219,39,119,0.1)] relative overflow-hidden transition-all">
                      <div className="absolute top-0 right-0 bg-pink-500 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl shadow-lg">LIVE PREVIEW</div>
                      <h3 className="font-semibold text-pink-500/80 text-sm mb-1.5 uppercase tracking-wide">{formData.label}</h3>
                      <p className="text-pink-400 font-bold text-lg">Preview Value</p>
                    </div>
                  )}
                </div>

                {/* Add to Cart Button */}
                <div className="pt-6 border-t border-zinc-800/50">
                  <div className="w-full flex justify-center items-center gap-2 bg-white text-black font-black rounded-2xl text-lg px-5 py-4 opacity-50 cursor-not-allowed">
                    Add to Cart
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
