"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { User, Package, Star, LogOut, Award, LayoutDashboard } from "lucide-react";
import Link from "next/link";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001"}/api`;

export default function UserProfile() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const [profileRes, ordersRes] = await Promise.all([
          axios.get(`${API_URL}/users/profile`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${API_URL}/orders/myorders`, { headers: { Authorization: `Bearer ${token}` } })
        ]);
        setProfile(profileRes.data);
        setOrders(ordersRes.data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
        localStorage.removeItem("userToken");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("adminToken");
    router.push("/login");
  };

  if (loading) {
    return <div className="min-h-[85vh] bg-black flex items-center justify-center"><span className="loading loading-spinner text-pink-500 loading-lg"></span></div>;
  }

  return (
    <div className="min-h-[85vh] bg-black relative overflow-hidden py-12 px-4">
      {/* Background Glow Effects */}
      <div className="absolute top-0 -left-20 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 -right-20 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full md:w-1/3 space-y-6">
            <div className="bg-zinc-900/50 backdrop-blur-2xl border border-zinc-800/80 shadow-2xl rounded-3xl p-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg border-4 border-black">
                  <span className="text-4xl font-bold text-white tracking-tighter">
                    {profile?.username?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight">{profile?.username}</h2>
                <p className="text-zinc-400 font-medium">{profile?.email}</p>
                
                <div className="mt-8 w-full flex justify-center gap-3 items-center bg-zinc-950/50 text-pink-400 p-4 rounded-2xl border border-zinc-800">
                  <Award size={28} />
                  <span className="font-black text-2xl tracking-tighter">{profile?.points || 0} Points</span>
                </div>

                {profile?.role?.toLowerCase() === "admin" && (
                  <Link href="/admin/dashboard" className="w-full mt-4 flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-2xl px-5 py-4 transition-all shadow-[0_0_20px_rgba(219,39,119,0.3)] hover:shadow-[0_0_30px_rgba(219,39,119,0.5)]">
                    <LayoutDashboard size={18} />
                    Admin Dashboard
                  </Link>
                )}

                <button onClick={handleLogout} className="w-full mt-4 flex items-center justify-center gap-2 bg-zinc-950/50 hover:bg-zinc-800 text-zinc-300 font-medium rounded-2xl px-5 py-4 transition-colors border border-zinc-800">
                  <LogOut size={18} /> Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-2/3 space-y-8">
            <div className="bg-zinc-900/50 backdrop-blur-2xl border border-zinc-800/80 shadow-2xl rounded-3xl p-8">
              <h3 className="text-2xl font-black text-white flex items-center gap-3 border-b border-zinc-800 pb-6 mb-6">
                <Package className="text-pink-500" /> Order History
              </h3>
              
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <Package size={64} className="mx-auto text-zinc-700 mb-6" />
                  <p className="text-zinc-400 font-medium text-lg">You haven't placed any orders yet.</p>
                  <Link href="/products" className="inline-block mt-6 bg-white text-black font-bold rounded-2xl px-8 py-4 hover:bg-zinc-200 transition-colors">
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order._id} className="bg-zinc-950/50 border border-zinc-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-zinc-700 transition-colors">
                      <div>
                        <div className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Order #{order._id.slice(-6)}</div>
                        <div className="font-bold text-white mt-1 text-lg">{new Date(order.createdAt).toLocaleDateString()}</div>
                        <div className="text-sm text-zinc-400 mt-1">{order.products.length} items</div>
                      </div>
                      <div className="text-left md:text-right">
                        <div className="font-black text-2xl text-pink-400">${order.totalAmount.toFixed(2)}</div>
                        <div className={`mt-2 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg inline-block ${order.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'}`}>
                          {order.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
