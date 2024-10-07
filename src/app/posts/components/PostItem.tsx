"use client";
import React from 'react';
import { Post } from '@/types/Post';
import CommentItem from './CommentItem';
import Link from 'next/link';
import PostButton from './PostButton';



export default function PostItem({ post, deletePost, editPost }: { post: Post, deletePost: (postId: number) => void, editPost: (postId: number) => void }) {
    return (
        <li key={post.id} className="p-6 border rounded-lg shadow-md bg-gray-200 mb-4">
            <div className="flex items-center mb-4">
                {/* <img src={post.userAvatar} alt={post.user} className="w-10 h-10 rounded-full mr-4" /> */}
                <div>
                    <h2 className="text-lg font-semibold">{post.user}</h2>
                    <p className="text-sm text-gray-500">{new Date(post.dateAdded).toLocaleDateString()}</p>
                </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-700 mb-4">{post.message}</p>
            <p className="text-gray-500 mb-4">{post.amountLikes} 👍</p>
            <div className="flex space-x-4 mb-4">
                <PostButton color="blue" onClick={editPost} postId={post.id}>Update</PostButton>
                <PostButton color="red" onClick={deletePost} postId={post.id}>Delete</PostButton>
            </div>
            <details className="mt-4">
                <summary className="text-xl font-semibold cursor-pointer">Comments</summary>
                <ul className="space-y-2 mt-2">
                    {post.comments.map((comment, index) => (
                        <CommentItem key={index} comment={comment} index={index} />
                    ))}
                </ul>
            </details>
        </li>
    );
};

