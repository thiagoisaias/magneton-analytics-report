import { format } from '@fast-csv/format';
import fs from 'fs';

export default function (data) {
  const csv = format({ headers: true });

  const ws = fs.createWriteStream(`analytics_report_${Date.now()}.csv`);
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
