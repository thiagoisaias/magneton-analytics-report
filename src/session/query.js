import axios from 'axios';

const { KEEN_PROJECT_ID, KEEN_READ_KEY } = process.env;

export default async function fetchData(timeframe) {
  const headers = {
    Authorization: KEEN_READ_KEY,
    'Content-Type': 'application/json',
  };

  return axios.post(
    `https://api.keen.io/3.0/projects/${KEEN_PROJECT_ID}/queries/extraction`,
    {
      event_collection: 'userSession',
      property_names: ['profile.user_id', 'profile.email', 'connected_at', 'disconnected_at'],
      timeframe,
      timezone: 'America/Sao_Paulo',
    },
    {
      headers,
    }
  );
}
