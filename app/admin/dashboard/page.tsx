"use client";

import { useEffect, useState } from "react";
import { Package, Users, DollarSign, ShoppingCart, FileCode2 } from "lucide-react";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001"}/api`;

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    men: 0,
    women: 0,
    others: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await axios.get(`${API_URL}/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
      } catch (error) {
        console.error("Error fetching stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64"><span className="loading loading-spinner loading-lg text-pink-500"></span></div>;
  }

  const statCards = [
    { title: "Total Revenue", value: `$${stats.totalRevenue.toFixed(2)}`, icon: <DollarSign size={28} />, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
    { title: "Total Orders", value: stats.totalOrders, icon: <ShoppingCart size={28} />, color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20" },
    { title: "Total Products", value: stats.totalProducts, icon: <Package size={28} />, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
    { title: "Total Users", value: stats.totalUsers, icon: <Users size={28} />, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-white">Overview</h2>
          <p className="text-zinc-400 font-medium mt-2">Real-time metrics for your storefront.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <div key={idx} className={`bg-zinc-900/50 backdrop-blur-2xl border ${card.border} rounded-3xl p-6 shadow-xl hover:bg-zinc-900/80 transition-all`}>
            <div className="flex items-center gap-5">
              <div className={`p-4 rounded-2xl ${card.bg} ${card.color}`}>
                {card.icon}
              </div>
              <div>
                <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{card.title}</div>
                <div className="text-3xl font-black text-white mt-1">{card.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-zinc-900/50 backdrop-blur-2xl border border-zinc-800/80 rounded-3xl p-8 shadow-xl">
          <h3 className="text-xl font-black text-white border-b border-zinc-800 pb-4 mb-6">Category Breakdown</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-bold text-zinc-300">Men's Collection</span>
                <span className="font-bold text-zinc-500">{stats.men} products</span>
              </div>
              <div className="w-full bg-zinc-950 rounded-full h-3">
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-3 rounded-full" style={{ width: `${Math.max(5, (stats.men / (stats.totalProducts || 1)) * 100)}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-bold text-zinc-300">Women's Collection</span>
                <span className="font-bold text-zinc-500">{stats.women} products</span>
              </div>
              <div className="w-full bg-zinc-950 rounded-full h-3">
                <div className="bg-gradient-to-r from-blue-500 to-emerald-500 h-3 rounded-full" style={{ width: `${Math.max(5, (stats.women / (stats.totalProducts || 1)) * 100)}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-bold text-zinc-300">Others</span>
                <span className="font-bold text-zinc-500">{stats.others} products</span>
              </div>
              <div className="w-full bg-zinc-950 rounded-full h-3">
                <div className="bg-gradient-to-r from-emerald-500 to-yellow-500 h-3 rounded-full" style={{ width: `${Math.max(5, (stats.others / (stats.totalProducts || 1)) * 100)}%` }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-zinc-900/50 to-zinc-950/50 backdrop-blur-2xl border border-zinc-800/80 rounded-3xl p-8 shadow-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
             <div className="bg-zinc-950 p-6 rounded-3xl border border-zinc-800 mb-6">
               <FileCode2 size={48} className="text-pink-500" />
             </div>
             <h3 className="text-2xl font-black text-white mb-3 tracking-tight">Dynamic CMS Active</h3>
             <p className="text-zinc-400 font-medium max-w-sm">
               Your store is powered by a dynamic schema. You can instantly add or remove fields from products at any time using the Schema Builder.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
