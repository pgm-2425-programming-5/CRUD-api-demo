"use client";
import React, { useState, useEffect } from 'react';
import { Post } from '@/types/Post';

type CreatePostProps = {
    post?: Post;
    onSubmit: (post: Post) => void;
};

export default function CreatePostForm({ post, onSubmit } : CreatePostProps) {
    const [user, setUser] = useState(post?.user || { username: '' });
    const [message, setMessage] = useState(post?.message || '');

    useEffect(() => {
        if (post) {
            setUser(post.user);
            setMessage(post.message);
        }
    }, [post]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const newPost: Post = {
            id: post?.id || Date.now(),
            dateAdded: post?.dateAdded || new Date(),
            user: { username: user.username },
            message,
            amountLikes: post?.amountLikes || 0,
            comments: post?.comments || [],
            createdAt: post?.createdAt || new Date(),
            documentId: ''
        };
        onSubmit(newPost);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col">
                <label htmlFor="user" className="mb-2 font-semibold text-gray-700">User:</label>
                <input
                    type="text"
                    id="user"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="message" className="mb-2 font-semibold text-gray-700">Message:</label>
                <input
                    type="text"
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Submit
            </button>
        </form>
    );
};

