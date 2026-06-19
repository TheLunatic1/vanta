"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Package, Users, Settings, LogOut, FileCode2, ShoppingCart } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("adminToken");
    if (!token && !pathname.includes("/admin/login")) {
      router.push("/admin/login");
    }
  }, [router, pathname]);

  if (!mounted) return null;

  if (pathname.includes("/admin/login")) {
    return <div className="min-h-screen bg-black">{children}</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("userToken");
    router.push("/admin/login");
  };

  const navLinks = [
    { name: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Products", href: "/admin/products", icon: <Package size={20} /> },
    { name: "Orders", href: "/admin/orders", icon: <ShoppingCart size={20} /> },
    { name: "Users", href: "/admin/users", icon: <Users size={20} /> },
    { name: "Schema Builder", href: "/admin/schema-builder", icon: <FileCode2 size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-black overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-0 -left-20 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 -right-20 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900/50 backdrop-blur-3xl border-r border-zinc-800/80 hidden md:flex flex-col z-10">
        <div className="p-6 border-b border-zinc-800">
          <h1 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">VANTA ADMIN</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 font-medium ${
                  isActive 
                    ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]" 
                    : "hover:bg-zinc-800/50 text-zinc-400 hover:text-white"
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-zinc-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3.5 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-2xl transition-colors font-medium"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        {/* Mobile Header */}
        <header className="md:hidden bg-zinc-900/50 backdrop-blur-xl border-b border-zinc-800 p-4 flex justify-between items-center">
          <h1 className="text-xl font-black tracking-tighter text-white">VANTA ADMIN</h1>
          {/* Mobile menu button could go here */}
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
