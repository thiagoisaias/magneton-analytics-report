import axios from 'axios';

const { KEEN_PROJECT_ID, KEEN_READ_KEY } = process.env;

export default async function fetchData(timeframe) {
  const headers = {
    Authorization: KEEN_READ_KEY,
    'Content-Type': 'application/json',
  };

  const pageTypes = ['transmission', 'chatRoom', 'virtualStandAnteroom', 'virtualStandCall'];

  const result = {};

  for (const type of pageTypes) {
    const { data } = await axios.post(
      `https://api.keen.io/3.0/projects/${KEEN_PROJECT_ID}/queries/extraction`,
      {
        event_collection: 'virtualNavigation',
        property_names: ['profile.user_id', 'profile.email', 'page.id', 'page.name'],
        timeframe,
        timezone: 'America/Sao_Paulo',
        filters: [{ operator: 'eq', property_name: 'page.type', property_value: type }],
      },
      {
        headers,
      }
    );
    result[type] = data?.result;
  }

  return result;
}
