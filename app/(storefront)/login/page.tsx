"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

export default function StorefrontLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001"}/api/users/login`, { email, password });
      localStorage.setItem("userToken", res.data.token);
      if (res.data.role?.toLowerCase() === "admin") {
        localStorage.setItem("adminToken", res.data.token);
      }
      router.push("/profile");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-black relative overflow-hidden py-12 px-4">
      {/* Background Glow Effects */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500 tracking-tight mb-2">
            Welcome Back
          </h2>
          <p className="text-zinc-400 font-medium">Sign in to access your Vanta account</p>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-2xl border border-zinc-800/80 p-8 rounded-3xl shadow-2xl">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm font-medium mb-6 flex items-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-300 ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  className="w-full bg-zinc-950/50 border border-zinc-800 text-white placeholder-zinc-600 text-sm rounded-2xl focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 block pl-11 p-3.5 transition-all outline-none" 
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-medium text-zinc-300">Password</label>
                <Link href="#" className="text-xs font-medium text-pink-400 hover:text-pink-300 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  className="w-full bg-zinc-950/50 border border-zinc-800 text-white placeholder-zinc-600 text-sm rounded-2xl focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 block pl-11 p-3.5 transition-all outline-none" 
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-zinc-200 focus:ring-4 focus:ring-zinc-500 font-bold rounded-2xl text-base px-5 py-4 text-center transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <span className="text-zinc-500 text-sm">Don't have an account? </span>
            <Link href="/register" className="text-white hover:text-pink-400 font-semibold text-sm transition-colors">
              Create one now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
