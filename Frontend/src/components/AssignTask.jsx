import { useState } from 'react';
import axios from 'axios';

export default function AssignTask({ users, onTaskAssigned }) {
  const [form, setForm] = useState({ title: '', description: '', assignedTo: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://team-task-traker-backend-tgwk.onrender.com/api/tasks', form, {
        headers: { 'x-auth-token': token }
      });
      setForm({ title: '', description: '', assignedTo: '' });
      onTaskAssigned();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">Assign New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Task Title"
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base focus:border-indigo-500 focus:ring-indigo-500 transition"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="Description (optional)"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base focus:border-indigo-500 focus:ring-indigo-500 transition min-h-24 sm:min-h-32"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <select
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base focus:border-indigo-500 focus:ring-indigo-500 transition"
          value={form.assignedTo}
          onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
        >
          <option value="">Select user</option>
          {users.filter(u => u.role !== 'admin').map(user => (
            <option key={user._id} value={user._id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition active:scale-95 text-base"
        >
          Assign Task
        </button>
      </form>
    </div>
  );
}