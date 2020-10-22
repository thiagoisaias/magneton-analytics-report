import 'dotenv/config';
import parseData from './parseData';
import fetchData from './fetchData';
import exportData from './exportData';

const { TIMEFRAME_START, TIMEFRAME_END } = process.env;

async function start() {
  const timeframe = {
    start: new Date(TIMEFRAME_START),
    end: new Date(TIMEFRAME_END),
  };

  console.log('Starting...');

  const analytics = await fetchData(timeframe);
  const parsedData = parseData(analytics);

  exportData(parsedData);

  console.log(`Done!`);
}

start();
