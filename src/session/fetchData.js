import { addHours, isBefore } from 'date-fns';
import { camelizeKeys } from 'humps';
import query from './query';

export default async function (timeframe) {
  let analytics = [];
  let control = timeframe.start;

  console.log(`Timeframe set to start: ${timeframe.start} / end: ${timeframe.end} `);

  while (isBefore(control, timeframe.end)) {
    try {
      let {
        data: { result },
      } = await query({
        start: control,
        end: addHours(control, 1),
      });

      analytics.push(...camelizeKeys(result));

      console.log(
        `${result.length} results were found from ${control} to ${addHours(control, 1)}...`
      );
    } catch (error) {
      console.log(error);
    } finally {
      control = addHours(control, 1);
    }
  }

  return analytics;
}
