import React, { useState } from 'react';

interface LoginFormProps {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleLoginWithGitHub: () => void;
    error?: string;
}

export default function LoginForm({ handleSubmit, handleLoginWithGitHub, error } : LoginFormProps) {
    return (
        <div className="p-4 border border-gray-300 rounded-md">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                    <input
                        name="email"
                        type="email"
                        required
                        id="email"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                    <input
                        name="password"
                        type="password"
                        required
                        id="password"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Login
                </button>
            </form>
            <hr className="my-6" />
            <button
                onClick={handleLoginWithGitHub}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
                Login with GitHub
            </button>
        </div>
    );
};

