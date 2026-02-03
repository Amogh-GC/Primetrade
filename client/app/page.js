'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="text-center text-white px-4">
        <h1 className="text-6xl font-bold mb-4 drop-shadow-lg">
          Primetrade.ai
        </h1>
        <p className="text-2xl mb-8 drop-shadow-md">
          Task Management Made Simple
        </p>
        <p className="text-lg mb-12 max-w-md mx-auto opacity-90">
          Organize your tasks efficiently with our powerful and intuitive task management system.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link
            href="/login"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors shadow-lg"
          >
            Sign Up
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-4xl mb-3">🔐</div>
            <h3 className="text-xl font-semibold mb-2">Secure Authentication</h3>
            <p className="text-sm opacity-90">Your data is protected with JWT authentication</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-4xl mb-3">📝</div>
            <h3 className="text-xl font-semibold mb-2">Task Management</h3>
            <p className="text-sm opacity-90">Create, update, and organize your tasks easily</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-4xl mb-3">👤</div>
            <h3 className="text-xl font-semibold mb-2">User Profile</h3>
            <p className="text-sm opacity-90">Manage your profile and preferences</p>
          </div>
        </div>
      </div>
    </div>
  );
}
