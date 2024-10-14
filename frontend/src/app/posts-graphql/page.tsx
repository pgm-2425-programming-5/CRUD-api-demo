import React from 'react';
import { Post } from '@/types/Post';
import PostItem from './components/PostItem';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { gql, request } from 'graphql-request';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

const STRAPI_GRAPHQL_URL = process.env.STRAPI_GRAPHQL_URL || 'http://localhost:1337/graphql';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';

async function fetchPosts(): Promise<Post[]> {
    const query = gql`
        query {
            posts {
              amountLikes
              comments {
                documentId
                dateAdded
                createdAt
                message
              }
            }
    }
    `;
    const headers = {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    };
    const response: { posts: Post[] } = await request(STRAPI_GRAPHQL_URL, query, {}, headers);
    return response.posts;
}

export const fetchCache = 'force-no-store';

export default async function PostsPage() {
    const posts = await fetchPosts();

    async function deletePost(postId: number) {
        "use server";
        const mutation = gql`
            mutation($id: ID!) {
                deletePost(id: $id) {
                    data {
                        id
                    }
                }
            }
        `;
        try {
            const variables = { id: postId };
            const response = await request(`${baseUrl}/graphql`, mutation, variables);
            if (response.deletePost.data.id) {
                console.log('Post deleted successfully');
                revalidatePath('/posts'); // Update cached posts
                redirect('/posts');
            } else {
                console.log('Failed to delete the post');
            }
        } catch (error) {
            console.error('Error deleting the post:', error);
        }
    }

    async function editPost(postId: number) {
        "use server";
        redirect(`/posts/edit/${postId}`);
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Posts</h1>
            <ul className="space-y-4">
                {posts.map(post => (
                    <PostItem key={post.id} post={post} deletePost={deletePost} editPost={editPost} />
                ))}
            </ul>
        </div>
    );
}
