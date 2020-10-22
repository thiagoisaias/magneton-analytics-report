import { format } from '@fast-csv/format';
import fs from 'fs';

export default function (data) {
  const csv = format({ headers: true });

  const path = fs.mkdirSync(`./data/sessions/${Date.now()}`, { recursive: true });
  const ws = fs.createWriteStream(`${path}/user_sessions.csv`);
  csv.pipe(ws).on('end', process.exit);

  Object.keys(data).forEach((userId) => {
    csv.write({
      id: userId,
      email: data[userId].email,
      sessionDuration: data[userId].sessionDuration,
    });
  });

  csv.end();
}
