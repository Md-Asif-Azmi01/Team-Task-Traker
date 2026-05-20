import { useState } from 'react';
import axios from 'axios';

export default function CreateUser({ onUserCreated }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://team-task-traker-backend-tgwk.onrender.com/api/users', form, {
        headers: { 'x-auth-token': token }
      });
      setMsg('User created successfully!');
      setForm({ name: '', email: '', password: '', role: 'user' });
      onUserCreated(); 
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Error creating user');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-4 sm:p-6 rounded-2xl shadow-md">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">Create New User</h2>
      {msg && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-sm sm:text-base">
          {msg}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            placeholder="Full Name"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base focus:border-indigo-500 focus:ring-indigo-500 transition"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="user@example.com"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base focus:border-indigo-500 focus:ring-indigo-500 transition"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            placeholder="Secure password"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base focus:border-indigo-500 focus:ring-indigo-500 transition"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base focus:border-indigo-500 focus:ring-indigo-500 transition"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition active:scale-95 text-base"
        >
          Create User
        </button>
      </form>
    </div>
  );
}