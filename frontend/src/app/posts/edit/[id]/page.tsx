"use client";
import { useState, useEffect } from 'react';
import { Post } from '@/types/Post';
import CreatePostForm from '../../components/forms/CreatePostForm';
import { redirect } from 'next/navigation';

export default function EditPost({params} : {params: {id: string}}) {
  const { id } = params;
  const [post, setPost] = useState({} as Post);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/posts/${id}`);
        if (!res.ok) {
          console.log('Failed to fetch post');
          setPost({} as Post);
          return;
        }
        const post = await res.json();
        setPost(post.post);
      };
      fetchPost();
    }
  }, [id]);

  const handleSubmit = async (post: Post) => {

    await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    window.location.href = '/posts';
  };
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <CreatePostForm post={post} onSubmit={handleSubmit} />
    </div>
  );
};
