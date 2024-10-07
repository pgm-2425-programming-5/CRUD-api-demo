"use client";
import { useState } from 'react';
import { Post } from '@/types/Post';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import CreatePostForm from '@/app/posts/components/forms/CreatePostForm';
import { useRouter } from 'next/navigation'
export default function CreatePost () {
  const [title, setTitle] = useState('');
  const router = useRouter();
  const handleSubmit = async (post: Post) => {
    const newPost = post;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    await fetch(`${baseUrl}/api/posts/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    });
    setTitle('');
    const id = newPost.id
    // revalidatePath('/posts') // Update cached posts
    router.push(`/posts/${id}`) // Navigate to the new post page
  };



  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <CreatePostForm onSubmit={handleSubmit} />
    </div>

  );
};

