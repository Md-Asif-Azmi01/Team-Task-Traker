export default function TaskCard({ task, updateStatus }) {
  const statusColors = {
    new: 'border-blue-400',
    'in-progress': 'border-yellow-400',
    completed: 'border-green-400'
  };

  return (
    <div className={`bg-white rounded-lg p-3 shadow-sm border-l-4 ${statusColors[task.status]} hover:shadow-md transition`}>
      <h3 className="font-medium text-gray-800 text-sm sm:text-base break-words">{task.title}</h3>
      {task.description && (
        <p className="text-xs sm:text-sm text-gray-500 mt-1 break-words">{task.description}</p>
      )}
      <p className="text-xs text-gray-400 mt-2">Assigned by: {task.assignedBy?.name}</p>
      <div className="flex flex-wrap gap-2 mt-3">
        {task.status === 'new' && (
          <>
            <button
              onClick={() => updateStatus(task._id, 'in-progress')}
              className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1.5 rounded hover:bg-yellow-200 transition active:scale-95 flex-1 sm:flex-none"
            >
              Start Progress
            </button>
            <button
              onClick={() => updateStatus(task._id, 'completed')}
              className="text-xs bg-green-100 text-green-800 px-2 py-1.5 rounded hover:bg-green-200 transition active:scale-95 flex-1 sm:flex-none"
            >
              Mark Complete
            </button>
          </>
        )}
        {task.status === 'in-progress' && (
          <button
            onClick={() => updateStatus(task._id, 'completed')}
            className="text-xs bg-green-100 text-green-800 px-2 py-1.5 rounded hover:bg-green-200 transition active:scale-95 flex-1 sm:flex-none"
          >
            Mark Complete
          </button>
        )}
        {task.status === 'completed' && (
          <span className="text-xs bg-green-200 text-green-800 px-2 py-1.5 rounded flex-1 text-center sm:flex-none">
            Done ✓
          </span>
        )}
      </div>
    </div>
  );
}