import 'dotenv/config';
import parseData from './parseData';
import fetchData from './fetchData';
import exportData from './exportData';

async function start() {
  const timeframe = {
    start: new Date(1589425200000), // 2020-05-14 00:00 SP
    end: new Date(1589684400000), // 2020-05-17 00:00 SP
  };

  console.log('Starting...');

  const analytics = await fetchData(timeframe);
  const parsedData = parseData(analytics);

  exportData(parsedData);

  console.log(`Final Result: ${analytics.length} sessions were found!`);
  console.log(`Final Result: ${Object.keys(parsedData).length} users were found!`);
}

start();
