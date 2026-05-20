import { useState, useEffect } from 'react';
import axios from 'axios';
import CreateUser from './CreateUser';
import AssignTask from './AssignTask';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState('tasks'); 
  const { user } = useAuth();

  const token = localStorage.getItem('token');
  const config = { headers: { 'x-auth-token': token } };

  const fetchUsers = async () => {
    const res = await axios.get('https://team-task-traker-1.onrender.com/api/users', config);
    setUsers(res.data);
  };

  const fetchTasks = async () => {
    const res = await axios.get('https://team-task-traker-1.onrender.com/api/tasks', config);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchUsers();
    fetchTasks();
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => setView('tasks')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg font-medium transition text-sm sm:text-base ${
              view === 'tasks'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Tasks
          </button>
          <button
            onClick={() => setView('users')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg font-medium transition text-sm sm:text-base ${
              view === 'users'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Users
          </button>
        </div>
      </div>

      {view === 'tasks' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <AssignTask users={users} onTaskAssigned={fetchTasks} />
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">All Tasks</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {tasks.map(task => (
                <div key={task._id} className="border rounded-lg p-3 hover:shadow transition">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-800 text-sm sm:text-base break-words">
                        {task.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate">
                        Assigned to: {task.assignedTo?.name}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">
                        By: {task.assignedBy?.name}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${
                        task.status === 'new'
                          ? 'bg-blue-100 text-blue-800'
                          : task.status === 'in-progress'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
              {tasks.length === 0 && (
                <p className="text-gray-500 text-center text-sm">No tasks yet.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <CreateUser onUserCreated={fetchUsers} />
      )}
    </div>
  );
}