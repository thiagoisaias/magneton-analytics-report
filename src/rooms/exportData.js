import { format } from '@fast-csv/format';
import fs from 'fs';

export default function (data) {
  const now = Date.now();
  const path = `./data/rooms/${now}`;

  fs.mkdirSync(path, { recursive: true });

  Object.keys(data).forEach((pageType) => {
    Object.keys(data[pageType]).forEach((pageId) => {
      const csv = format();
      const pageName = data[pageType][pageId].pageName;
      const ws = fs.createWriteStream(`${path}/${pageType} : ${pageName} (${pageId}).csv`);

      csv.pipe(ws).on('end', process.exit);

      for (const email of data[pageType][pageId].emailList.values()) {
        csv.write({ email });
      }

      csv.end();
    });
  });
}
