"use client";
import React from 'react';
import { Post } from '@/types/Post';
import CommentItem from './CommentItem';
import Link from 'next/link';
import PostButton from './PostButton';

type PostItemProps = {
    post: Post;
    deletePost?: (postId: string) => void;
    editPost?: (postId: string) => void;
};



export default function PostItem({ post, deletePost, editPost }: PostItemProps) {
    return (
        <li key={post.documentId} className="p-6 border rounded-lg shadow-md bg-gray-200 mb-4">
            <div className="flex items-center mb-4">
                {/* <img src={post.userAvatar} alt={post.user} className="w-10 h-10 rounded-full mr-4" /> */}
                <div>
                    <h2 className="text-lg font-semibold"> {post.user?.username || 'anonymous'}</h2>
                    <p className="text-sm text-gray-500">{new Date(post.dateAdded).toLocaleDateString()}</p>
                </div>
            </div>
            <p className="text-gray-700 mb-4"><a href={`/posts/${post.documentId}`}>{post.message}</a></p>
            <p className="text-gray-500 mb-4">{post.amountLikes} 👍</p>
            <div className="flex space-x-4 mb-4">
                {editPost && (
                                    <PostButton color="blue" onClick={editPost} postId={post.documentId}>Update</PostButton>

                )}                
                {deletePost && (
                    <PostButton color="red" onClick={deletePost} postId={post.documentId}>Delete</PostButton>
                )}
            </div>

            <details className="mt-4">
                <summary className="text-xl font-semibold cursor-pointer">Comments</summary>
                <ul className="space-y-2 mt-2">
                    {post.comments.map((comment, index) => (
                        <CommentItem key={index} comment={comment} index={index} />
                    ))}
                </ul>
                {post.comments.length === 0 && (
                    <p className="text-gray-500">No comments yet</p>
                )}
            </details>
        </li>
    );
};

