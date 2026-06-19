"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Edit2, Trash2 } from "lucide-react";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001"}/api`;

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // For Manual order creation
  const [users, setUsers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  
  const [newOrder, setNewOrder] = useState({
    user: "",
    productID: "",
    quantity: 1,
    totalAmount: 0,
    status: "Completed",
    notes: ""
  });
  const [editingOrder, setEditingOrder] = useState<any>(null);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const [oRes, uRes, pRes] = await Promise.all([
        axios.get(`${API_URL}/orders`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_URL}/users`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_URL}/products`, { headers: { Authorization: `Bearer ${token}` } })
      ]);
      setOrders(oRes.data);
      setUsers(uRes.data);
      setProducts(pRes.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      const payload = {
        user: newOrder.user,
        products: [{ productID: newOrder.productID, quantity: newOrder.quantity }],
        totalAmount: newOrder.totalAmount,
        status: newOrder.status,
        notes: newOrder.notes
      };
      
      await axios.post(`${API_URL}/orders`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error(error);
      alert("Error creating order");
    }
  };

  const handleDeleteOrder = async (id: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${API_URL}/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (error) {
      console.error(error);
      alert("Error deleting order");
    }
  };

  const handleUpdateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(`${API_URL}/orders/${editingOrder._id}`, {
        status: editingOrder.status,
        notes: editingOrder.notes
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditingOrder(null);
      fetchData();
    } catch (error) {
      console.error(error);
      alert("Error updating order");
    }
  };

  if (loading) return <div className="text-center p-8"><span className="loading loading-spinner"></span></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Orders</h2>
          <p className="text-base-content/60">Manage manual purchases.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="px-5 py-2.5 rounded-xl font-bold bg-white text-black hover:bg-zinc-200 transition-colors">
          Record Manual Order
        </button>
      </div>

      <div className="bg-zinc-900/50 backdrop-blur-2xl border border-zinc-800/80 rounded-3xl shadow-xl">
        <div className="card-body overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Notes</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id}>
                  <td className="font-mono text-sm">{o._id.slice(-6).toUpperCase()}</td>
                  <td className="font-bold">{o.user?.username || 'Unknown'}</td>
                  <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td className="font-bold text-primary">${o.totalAmount.toFixed(2)}</td>
                  <td><div className={`badge ${o.status === 'Completed' ? 'badge-success' : o.status === 'Pending' ? 'badge-warning' : o.status === 'Cancelled' ? 'badge-error' : 'badge-info'}`}>{o.status}</div></td>
                  <td className="text-sm opacity-70">{o.notes}</td>
                  <td className="text-right">
                    <button onClick={() => setEditingOrder(o)} className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors"><Edit2 size={18} /></button>
                    <button onClick={() => handleDeleteOrder(o._id)} className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
            {orders.length > 0 && (
              <tfoot>
                <tr className="bg-zinc-950/50 border-t border-zinc-800">
                  <td colSpan={3} className="text-right font-bold text-zinc-300 py-4">Total Summary:</td>
                  <td className="font-black text-pink-500 text-lg py-4">
                    ${orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0).toFixed(2)}
                  </td>
                  <td colSpan={2} className="text-zinc-500 font-medium py-4">
                    ({orders.length} Total Orders)
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
          {orders.length === 0 && <div className="text-center py-8">No orders found.</div>}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900/90 border border-zinc-800/80 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b border-zinc-800">
              <h3 className="font-bold text-xl text-white">Record Manual Order</h3>
            </div>
            <form onSubmit={handleCreateOrder} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-300 ml-1">User</label>
                <select className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 p-3 outline-none transition-all" required 
                  value={newOrder.user} onChange={e => setNewOrder({...newOrder, user: e.target.value})}>
                  <option value="">Select User...</option>
                  {users.map(u => <option key={u._id} value={u._id}>{u.username} ({u.email})</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-300 ml-1">Product</label>
                <select className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 p-3 outline-none transition-all" required 
                  value={newOrder.productID} onChange={e => setNewOrder({...newOrder, productID: e.target.value})}>
                  <option value="">Select Product...</option>
                  {products.map(p => <option key={p.productID} value={p.productID}>[{p.productID}] {p.title} - ${p.price}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-300 ml-1">Total Amount ($)</label>
                <input type="number" step="0.01" className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 p-3 outline-none transition-all" required 
                  value={newOrder.totalAmount} onChange={e => setNewOrder({...newOrder, totalAmount: parseFloat(e.target.value) || 0})} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-300 ml-1">Admin Notes</label>
                <input type="text" className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 p-3 outline-none transition-all" 
                  value={newOrder.notes} onChange={e => setNewOrder({...newOrder, notes: e.target.value})} />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800/50 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl font-bold bg-zinc-800 text-white hover:bg-zinc-700 transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl font-bold bg-white text-black hover:bg-zinc-200 transition-colors">Save Order</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editingOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900/90 border border-zinc-800/80 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b border-zinc-800">
              <h3 className="font-bold text-xl text-white">Edit Order</h3>
            </div>
            <form onSubmit={handleUpdateOrder} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-300 ml-1">Status</label>
                <select className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 p-3 outline-none transition-all" required
                  value={editingOrder.status} onChange={e => setEditingOrder({...editingOrder, status: e.target.value})}>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Processing">Processing</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-300 ml-1">Admin Notes</label>
                <input type="text" className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 p-3 outline-none transition-all" 
                  value={editingOrder.notes} onChange={e => setEditingOrder({...editingOrder, notes: e.target.value})} />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800/50 mt-6">
                <button type="button" onClick={() => setEditingOrder(null)} className="px-5 py-2.5 rounded-xl font-bold bg-zinc-800 text-white hover:bg-zinc-700 transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl font-bold bg-white text-black hover:bg-zinc-200 transition-colors">Update Order</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
