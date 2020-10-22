import uniqBy from 'lodash.uniqby';

export default function parseData(data) {
  const parsedData = {
    transmission: {},
    chatRoom: {},
    virtualStandAnteroom: {},
    virtualStandCall: {},
  };

  Object.keys(data).forEach((pageType) => {
    uniqBy(data[pageType], 'profile.userId').forEach((row) => {
      try {
        const {
          profile: { userId, email },
          page: { id: pageId, name: pageName },
        } = row;
        if (!parsedData[pageType][pageId]) {
          parsedData[pageType][pageId] = [{ userId, email, pageName, pageId }];
        } else {
          parsedData[pageType][pageId] = [
            ...parsedData[pageType][pageId],
            { userId, email, pageName, pageId },
          ];
        }
      } catch (error) {
        console.log(
          `Something went wrong with data: ${row.profile?.email} ${row.profile?.id} ${row.page?.name} ${row.page?.type}`
        );
      }
    });
  });

  return parsedData;
}
