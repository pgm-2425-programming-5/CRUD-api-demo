import { AwesomeGraphQLClient } from 'awesome-graphql-client';

import fetch from 'node-fetch';
import settings from './settings.mjs';

const client = new AwesomeGraphQLClient({
  endpoint: `${settings.STRAPI_GRAPHQL_URL}`,
  fetch,
  fetchOptions: {
    headers: {
      Authorization: `Bearer ${settings.STRAPI_API_TOKEN}`,
    },
  },
});

export default client;
