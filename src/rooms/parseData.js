export default function parseData(data) {
  const parsedData = {
    transmission: {},
    chatRoom: {},
    virtualStandAnteroom: {},
    virtualStandCall: {},
  };

  Object.keys(data).forEach((pageType) => {
    console.log('pagetype size', data[pageType].length);
    data[pageType].forEach((row) => {
      try {
        const {
          profile: { email },
          page: { id: pageId, name: pageName },
        } = row;
        const currentPageIdSet = parsedData[pageType][pageId];
        if (!currentPageIdSet) {
          parsedData[pageType][pageId] = { pageName, emailList: new Set().add(email) };
        } else {
          currentPageIdSet.emailList.add(email);
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
