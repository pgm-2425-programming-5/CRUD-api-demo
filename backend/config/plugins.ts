export default () => ({
  "users-permissions": {
    config: {
      register: {
        allowedFields: ["nickname"],
      },
    },
  },
  "graphql": {
    enabled: true,
    config: {
      playgroundAlways: true,
    },
  },
  "apollo-sandbox": {
    enabled: true,
  },
});
