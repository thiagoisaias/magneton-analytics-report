import { format } from '@fast-csv/format';
import fs from 'fs';

export default function (data) {
  Object.keys(data).forEach((pageType) => {
    Object.keys(data[pageType]).forEach((pageId) => {
      const csv = format({ headers: true });
      const ws = fs.createWriteStream(`${pageType}_${pageId}_${Date.now()}.csv`);

      csv.pipe(ws).on('end', process.exit);

      data[pageType][pageId].forEach(({ id, email }) => {
        csv.write({
          id,
          email,
        });
      });

      csv.end();
    });
  });
}
