import { Comment, Post } from '@/types/Post';
import PostItem from '../components/PostItem';

type Props = {
    params: {
        id: string;
    };
};

export default async function PostPage ({ params }: Props) {
    async function getPost() {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/posts/${params.id}`);
        const data = await response.json();
        return data.post;
    }
    const post = await getPost();


return (
    <PostItem key={post.id} post={post} />
);
};

