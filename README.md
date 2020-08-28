# magneton-analytics-report

- Update the timeframe in `index.js`.
- Create an .env file with `KEEN_PROJECT_ID`, `KEEN_READ_KEY`, `TIMEFRAME_START` and `TIMEFRAME_END` values.
- Run: `yarn`
- Run: `yarn start`

- The number of results returned by `query.js` cannot be bigger than 100k. If this happens, an error will be thrown. To fix this issue, you should split the time interval control in `fetchData.js` in smaller intervals.
