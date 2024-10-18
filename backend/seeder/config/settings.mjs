import 'dotenv/config';

const settings = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || 'http://127.0.0.1',
  PORT: process.env.PORT || 8080,
  STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN,
  STRAPI_GRAPHQL_URL: process.env.STRAPI_GRAPHQL_URL,
};

export default settings;
