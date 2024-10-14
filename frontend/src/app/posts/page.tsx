import React from 'react';
import { Post } from '@/types/Post';
import PostItem from './components/PostItem';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import qs from 'qs';


async function fetchPosts(): Promise<Post[]>{
    // edited pages
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337' ;
    const response = await fetch(`${baseUrl}/api/posts?populate=*`);
    if (!response.ok) {
        throw new Error('Failed to fetch posts');
    }
    const data = await response.json();

    // methode 2
    // const path = '/api/posts';
    // const url  = new URL(path, baseUrl);
    // url.search = qs.stringify({ populate: '*' });
    // const response = await fetch(url);
    // if (!response.ok) {
    //     throw new Error('Failed to fetch posts');
    // }
    // const data = await response.json();
    
    return data.data;
};
export const fetchCache = 'force-no-store';
export default async function PostsPage(){
    const posts = await fetchPosts();

    async function deletePost(postId: number) {
        "use server";
        // const confirmed = confirm('Are you sure you want to delete this post?');
        if (true) {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337' || 'http://localhost:3000';
                const response = await fetch(`${baseUrl}/api/posts/${postId}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    console.log('Post deleted successfully');
                    revalidatePath('/posts') // Update cached posts
                    redirect('/posts');
                    // Optionally, you can add logic to remove the post from the UI
                } else {
                    // alert('Failed to delete the post');
                    console.log('Failed to delete the post');
                }
            } catch (error) {
                console.error('Error deleting the post:', error);
                // alert('An error occurred while deleting the post');
            }
        }
    };
    
    async function editPost(postId: number) {
        "use server";
        redirect(`/posts/edit/${postId}`);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Posts</h1>
            <ul className="space-y-4">
                {posts.map(post => (
                    <PostItem key={post.id} post={post} deletePost={deletePost} editPost={editPost}/>
                ))}
            </ul>
        </div>
    );
};
