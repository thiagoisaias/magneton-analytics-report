import uniqBy from 'lodash.uniqby';

export default function parseData(data) {
  const parsedData = {
    transmission: {},
    chatRoom: {},
    virtualStandAnteroom: {},
    virtualStandCall: {},
  };

  Object.keys(data).forEach((pageType) => {
    uniqBy(data[pageType], 'profile.userId').forEach(
      ({ profile: { userId, email }, page: { id: pageId, name: pageName } }) => {
        if (!parsedData[pageType][pageId]) {
          parsedData[pageType][pageId] = [{ userId, email, pageName, pageId }];
        } else {
          parsedData[pageType][pageId] = [
            ...parsedData[pageType][pageId],
            { userId, email, pageName, pageId },
          ];
        }
      }
    );
  });

  return parsedData;
}
