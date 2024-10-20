import { Post } from '@/types/Post';
import PostItem from '../components/PostItem';
import { gql, request } from 'graphql-request';
const STRAPI_GRAPHQL_URL = process.env.STRAPI_GRAPHQL_URL || 'http://localhost:1337/graphql';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';


const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';

type Props = {
    params: {
        id: string;

    },
    req: any;
};



async function fetchPost(id: string): Promise<Post> {
    const query = gql`
        query Query($documentId: ID!) {
  post(documentId: $documentId) {
    amountLikes
    comments {
      dateAdded
      message
      users_permissions_user {
        username
      }
    }
    user {
      username
    }
    message
    dateAdded
    documentId
  }
}
    `;
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('next-auth.jwt-token');
    console.log(sessionToken, 'sessionToken');
    const headers = {
        Authorization: `Bearer ${sessionToken}`,
    };
    if (!sessionToken) {
        redirect('/login' );
    }
    const variables = { "documentId": id };
    const response: { post: Post } = await request(STRAPI_GRAPHQL_URL, query, variables, headers);
    console.log(response, 'response');
    return response.post;
}

export default async function PostPage({ params }: Props) {
    const post = await fetchPost(params.id);

    return (
        <PostItem key={post.documentId} post={post} />
    );
}
