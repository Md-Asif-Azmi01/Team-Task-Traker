import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from './TaskCard';

export default function UserDashboard() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('https://team-task-traker-1.onrender.com/api/tasks/my', {
      headers: { 'x-auth-token': token }
    });
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateStatus = async (taskId, newStatus) => {
    const token = localStorage.getItem('token');
    await axios.put(`https://team-task-traker-1.onrender.com/api/tasks/${taskId}/status`,
      { status: newStatus },
      { headers: { 'x-auth-token': token } }
    );
    fetchTasks();
  };

  const newTasks = tasks.filter(t => t.status === 'new');
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  return (
    <div className="w-full">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">My Tasks</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Column title="New" color="blue" tasks={newTasks} updateStatus={updateStatus} />
        <Column title="In Progress" color="yellow" tasks={inProgressTasks} updateStatus={updateStatus} />
        <Column title="Completed" color="green" tasks={completedTasks} updateStatus={updateStatus} />
      </div>
    </div>
  );
}

function Column({ title, color, tasks, updateStatus }) {
  const bgMap = { blue: 'bg-blue-50', yellow: 'bg-yellow-50', green: 'bg-green-50' };
  const borderMap = { blue: 'border-blue-200', yellow: 'border-yellow-200', green: 'border-green-200' };
  const headerMap = {
    blue: 'bg-blue-100 text-blue-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    green: 'bg-green-100 text-green-800'
  };

  return (
    <div className={`rounded-2xl shadow-md ${bgMap[color]} border ${borderMap[color]} flex flex-col h-full`}>
      <div className={`px-4 py-3 rounded-t-2xl font-semibold text-sm sm:text-base ${headerMap[color]}`}>
        {title} ({tasks.length})
      </div>
      <div className="flex-1 p-3 space-y-3 overflow-y-auto">
        {tasks.map(task => (
          <TaskCard key={task._id} task={task} updateStatus={updateStatus} />
        ))}
        {tasks.length === 0 && <p className="text-gray-400 text-center mt-4 text-sm">No tasks</p>}
      </div>
    </div>
  );
}