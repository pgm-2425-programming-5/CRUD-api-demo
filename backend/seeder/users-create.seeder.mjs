import bcrypt from 'bcrypt';
import client from './config/graphql_client.mjs';
import { faker } from '@faker-js/faker';
import { generateValueBetweenMinAndMax } from './lib/utils.mjs';

const mutationCreateUser = `
  mutation CREATE_USER($data: UsersPermissionsUserInput!) {
    createUsersPermissionsUser(data: $data) {
      data {
        documentId
      }
    }
  }
`;

(async () => {
  /*
   * Create a User (Local Provider)
   */
  const createUser = async (newUser) => {
    try {
      const { createUsersPermissionsUser } = await client.request(
        mutationCreateUser,
        {
          data: newUser,
        }
      );

      if (!createUsersPermissionsUser) {
        throw new Error(
          `Can't create the user: ${newUser.firstname} ${newUser.lastname}!`
        );
      }

      const { documentId } = createUsersPermissionsUser.data;
      console.log(
        `User ${newUser.firstname} ${newUser.lastname} created with ID: ${documentId}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  /*
   * Create a Users via promises
   */
  const createUsers = async (n = 20) => {
    // Create default user
    await createUser({
      firstname: 'Tim',
      lastname: 'Timmers',
      username: 'tim',
      email: 'tim@example.com',
      password: 'artevelde',
      isAdmin: false,
      role: '1', // Authenticated
    });

    // Create random users
    for (let i = 0; i < n; i++) {
      const gender = generateValueBetweenMinAndMax(0, 1);
      const firstname = faker.person.firstName(gender);
      const lastname = faker.person.lastName(gender);

      const newUser = {
        firstname,
        lastname,
        username: `${firstname.toLowerCase()}.${Date.now()}`,
        email: faker.internet.exampleEmail({ firstname, lastname }),
        // password: bcrypt.hashSync('artevelde', 10),
        password: 'Pa$$w0rd!',
        isAdmin: false,
        role: '1', // Authenticated
      };
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => setTimeout(resolve, 300 * i)).then(() =>
        createUser(newUser)
      );
    }
  };

  /*
   * Create Models in Auth
   */
  await createUsers(30);
})();
