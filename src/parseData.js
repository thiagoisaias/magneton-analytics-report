import { differenceInSeconds, parseISO } from 'date-fns';

export default function parseData(data) {
  let parsed = {};

  data.forEach(({ profile: { userId, email }, connectedAt, disconnectedAt }) => {
    const connectedAtISO = parseISO(connectedAt);
    const disconnectedAtISO = parseISO(disconnectedAt);
    const currentDifference = differenceInSeconds(disconnectedAtISO, connectedAtISO);

    parsed[userId] = {
      email,
      userId,
      sessionDuration:
        parsed[userId] && parsed[userId].sessionDuration
          ? parsed[userId].sessionDuration + currentDifference
          : currentDifference,
    };
  });

  return parsed;
}
