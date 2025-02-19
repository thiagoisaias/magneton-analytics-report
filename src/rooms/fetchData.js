import { addHours, isBefore } from 'date-fns';
import { camelizeKeys } from 'humps';
import query from './query';

export default async function (timeframe) {
  const analytics = {
    transmission: [],
    chatRoom: [],
    virtualStandAnteroom: [],
    virtualStandCall: [],
  };
  let control = timeframe.start;

  console.log(`Timeframe set to start: ${timeframe.start} / end: ${timeframe.end} `);

  while (isBefore(control, timeframe.end)) {
    try {
      console.log(`Fetching data from ${control} to ${addHours(control, 1)}...`);

      const result = await query({
        start: control,
        end: addHours(control, 1),
      });

      Object.keys(analytics).map((pageType) => {
        analytics[pageType] = [...analytics[pageType], ...camelizeKeys(result[pageType])];
        console.log(`${result[pageType].length} results were found for pageType ${pageType}`);
      });
    } catch (error) {
      console.log(error);
    } finally {
      control = addHours(control, 1);
    }
  }

  return analytics;
}
