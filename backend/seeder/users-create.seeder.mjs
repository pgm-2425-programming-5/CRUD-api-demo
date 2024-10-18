import bcrypt from 'bcrypt';
import client from './config/graphql_client.mjs';
import { faker } from '@faker-js/faker';
import { generateValueBetweenMinAndMax } from './lib/utils.mjs';
// import users from './path/to/your/users.js'; // Adjust the path to your users.js file

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
   * Create Users via promises
   */
  const createUsers = async (n = 20) => {
    // Create random users
    for (let i = 0; i < n; i++) {
      const gender = generateValueBetweenMinAndMax(0, 1);
      const firstname = faker.person.firstName(gender);
      const lastname = faker.person.lastName(gender);

      const newUser = {
        username: `${firstname.toLowerCase()}.${Date.now()}`,
        email: faker.internet.exampleEmail({ firstname, lastname }),
        // password: bcrypt.hashSync('artevelde', 10),
        password: 'Pa$$w0rd!',
        role: '2', // Authenticated
        confirmed: true,
      };
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => setTimeout(resolve, 300 * i)).then(() =>
        createUser(newUser)
      );
    }
  };

  const createUsersFromFile = async () => {
    // Create provided users
    for (const user of users) {
      const newUser = {
        username: user.username,
        email: user.email,
        password: user.password,
        role: '1', // Authenticated
      };
      // eslint-disable-next-line no-await-in-loop
      await createUser(newUser);
    }
  }

  const createAdmins = async (n = 1) => {
    for (let i = 0; i < n; i++) {
      createUser(1, true);
    }
  };

  /*
   * Create Models in Auth
   */
  await createUsers(30);
  // await createUsersFromFile();

})();
