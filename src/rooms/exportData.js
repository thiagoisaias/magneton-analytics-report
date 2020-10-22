import { format } from '@fast-csv/format';
import fs from 'fs';

export default function (data) {
  const now = Date.now();
  const path = `./data/rooms/${now}`;

  fs.mkdirSync(path, { recursive: true });

  Object.keys(data).forEach((pageType) => {
    Object.keys(data[pageType]).forEach((pageId) => {
      const csv = format({ headers: true });
      const ws = fs.createWriteStream(`${path}/${pageType}_${pageId}.csv`);

      csv.pipe(ws).on('end', process.exit);

      data[pageType][pageId].forEach(({ userId, email }) => {
        csv.write({
          userId,
          email,
        });
      });

      csv.end();
    });
  });
}
