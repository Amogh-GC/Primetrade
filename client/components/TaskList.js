'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '@/lib/api';

export default function TaskList({ tasks, onTaskDeleted, onEditTask }) {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (taskId) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    setDeletingId(taskId);
    try {
      const response = await api.delete(`/tasks/${taskId}`);
      if (response.data.success) {
        toast.success('Task deleted successfully!');
        onTaskDeleted(taskId);
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete task.';
      toast.error(message);
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Tasks Yet</h3>
        <p className="text-gray-600">Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{task.title}</h3>
              {task.description && (
                <p className="text-gray-600 text-sm mb-3">{task.description}</p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                task.status
              )}`}
            >
              {task.status.replace('-', ' ').toUpperCase()}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(
                task.priority
              )}`}
            >
              {task.priority.toUpperCase()} PRIORITY
            </span>
            {task.dueDate && (
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
                Due: {formatDate(task.dueDate)}
              </span>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onEditTask(task)}
              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm font-medium"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(task._id)}
              disabled={deletingId === task._id}
              className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm font-medium disabled:bg-red-300 disabled:cursor-not-allowed"
            >
              {deletingId === task._id ? 'Deleting...' : 'Delete'}
            </button>
          </div>

          <div className="mt-3 text-xs text-gray-500">
            Created: {formatDate(task.createdAt)}
          </div>
        </div>
      ))}
    </div>
  );
}
