import 'dotenv/config';
import parseData from './rooms/parseData';
import fetchData from './rooms/fetchData';
import exportData from './rooms/exportData';

const { TIMEFRAME_START, TIMEFRAME_END } = process.env;

async function start() {
  const timeframe = {
    start: new Date(TIMEFRAME_START),
    end: new Date(TIMEFRAME_END),
  };

  console.log('Starting...');

  const analytics = await fetchData(timeframe);

  console.log(analytics);
  const parsedData = parseData(analytics);

  exportData(parsedData);

  console.log(`Done!`);
}

start();
