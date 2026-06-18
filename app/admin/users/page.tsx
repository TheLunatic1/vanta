"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Award } from "lucide-react";

const API_URL = "http://localhost:5001/api";

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Points Modal
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [pointsInput, setPointsInput] = useState<number>(0);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenPointsModal = (user: any) => {
    setSelectedUser(user);
    setPointsInput(user.points || 0);
    setShowModal(true);
  };

  const handleUpdatePoints = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(`${API_URL}/users/${selectedUser._id}/points`, { points: pointsInput }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowModal(false);
      fetchUsers();
    } catch (error) {
      console.error(error);
      alert("Failed to update points");
    }
  };

  if (loading) return <div className="text-center p-8"><span className="loading loading-spinner"></span></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Users</h2>
          <p className="text-base-content/60">Manage customers and admins.</p>
        </div>
      </div>

      <div className="bg-zinc-900/50 backdrop-blur-2xl border border-zinc-800/80 rounded-3xl shadow-xl">
        <div className="card-body overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Reward Points</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td className="font-bold">{u.username}</td>
                  <td>{u.email}</td>
                  <td>
                    <div className={`badge ${u.role === 'Admin' ? 'badge-primary' : 'badge-ghost'}`}>
                      {u.role}
                    </div>
                  </td>
                  <td className="text-accent font-bold">{u.points || 0}</td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button 
                      onClick={() => handleOpenPointsModal(u)}
                      className="btn btn-sm btn-outline btn-accent"
                    >
                      <Award size={16} /> Manage Points
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && <div className="text-center py-8">No users found.</div>}
        </div>
      </div>

      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900/90 border border-zinc-800/80 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-zinc-800">
              <h3 className="font-bold text-xl text-white">Manage Points for {selectedUser.username}</h3>
            </div>
            <form onSubmit={handleUpdatePoints} className="p-6 space-y-6">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-300 ml-1">Total Reward Points</label>
                <input type="number" className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 p-3 outline-none transition-all" required 
                  value={pointsInput} onChange={e => setPointsInput(parseInt(e.target.value) || 0)} />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl font-bold bg-zinc-800 text-white hover:bg-zinc-700 transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl font-bold bg-white text-black hover:bg-zinc-200 transition-colors">Save Points</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
