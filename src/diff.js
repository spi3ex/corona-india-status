function diff(prevJSON, newJSON) {
  const oldJSONDate = new Date(prevJSON.lastUpdated);
  const newJSONDate = new Date(newJSON.lastUpdated);

  if (
    newJSONDate.getDate() !== oldJSONDate.getDate() ||
    newJSONDate.getMonth() !== oldJSONDate.getMonth() ||
    newJSONDate.getFullYear() !== oldJSONDate.getFullYear()
  ) {
    for (const state in prevJSON.data) {
      if(newJSON.data[state] && prevJSON.data[state]) {
        newJSON.data[state].newCasesToday =
        newJSON.data[state].totalIndianCases +
        newJSON.data[state].totalForeignCases -
        (prevJSON.data[state].totalIndianCases +
          prevJSON.data[state].totalForeignCases);
      }
    }
  } else {
    for (state in prevJSON.data) {
      if(newJSON.data[state] && prevJSON.data[state]) {
        const newCases =
        newJSON.data[state].totalIndianCases +
        newJSON.data[state].totalForeignCases -
        (prevJSON.data[state].totalIndianCases +
          prevJSON.data[state].totalForeignCases);

        newJSON.data[state].newCasesToday =
          (prevJSON.data[state].newCasesToday || 0) + newCases;
      }
    }
  }

  return newJSON;
}

module.exports = {
  diff
};
