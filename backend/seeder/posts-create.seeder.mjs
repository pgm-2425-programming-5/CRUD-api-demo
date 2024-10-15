import client from './config/graphql_client.mjs';
import posts from './data/posts.mjs';

const mutationCreatePost = `
  mutation createP($data: PostInput!) {
  createPost(data: $data) {
    amountLikes
    message
    comments {
      message
    }
    dateAdded
  }
}
`;

const queryFirstUser = `
query Query {
  usersPermissionsUsers {
    documentId
  }
}
`;

(async () => {
  /*
   * Get the first user
   */
  const getFirstUser = async () => {
    try {
      const {usersPermissionsUsers } = await client.request(queryFirstUser);
      if (usersPermissionsUsers.length === 0) {
        throw new Error("No users found in the database");
      }
      return usersPermissionsUsers[0].documentId;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  /*
   * Create a Post (Local Provider)
   */
  const createPost = async ({ postId, dateAdded, user, message, amountLikes, comments }) => {
    let data = {"data": { dateAdded, message, amountLikes} };
    try {
      const { createPost } = await client.request(mutationCreatePost, data);

      if (!createPost) {
        throw new Error(`Can't create the post with id ${id}`);
      }

      console.log(`Post created with user ${createPost.user} and message ${createPost.message}`);
    } catch (error) {
      console.log(error);
    }
  };

  /*
   * Create posts
   */
  const createPosts = async () => {
    try {
      const firstUserId = await getFirstUser();
      for (const post of posts) {
        // eslint-disable-next-line no-await-in-loop
        const { dateAdded, message, amountLikes, comments } = post;
        await createPost({
          dateAdded: new Date(dateAdded).toISOString(),
          user: firstUserId,
          message,
          amountLikes,
          comments,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*
   * Create posts
   */
  createPosts();
})();
