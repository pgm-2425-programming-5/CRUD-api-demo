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
    endpoint: "/graphql",
    config: {
      playgroundAlways: false,
    },
  },
});
