import { Post } from '@/types/Post';

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
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-900">{post.title}</h1>
        <p className="text-gray-500 mb-4">By <span className="font-medium text-gray-700">{post.user}</span> on {new Date(post.dateAdded).toLocaleDateString()}</p>
        <p className="text-lg text-gray-800 mb-6">{post.message}</p>
        <div className="flex items-center mb-6 space-x-4">
            <span className="text-blue-600 font-semibold">Likes: {post.amountLikes}</span>
            <span className="text-green-600 font-semibold">Comments: {post.comments.length}</span>
        </div>
        <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Comments</h2>
            {post.comments.map((comment, index) => (
                <div key={index} className="mb-4 p-4 border rounded-lg bg-gray-50">
                    <p className="font-semibold text-gray-800">{comment.user}</p>
                    <p className="text-gray-700">{comment.message}</p>
                </div>
            ))}
        </div>
    </div>
);
};

