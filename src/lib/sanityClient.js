import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-04-14',
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  useCdn: process.env.NODE_ENV === 'production',
});

export default client;
