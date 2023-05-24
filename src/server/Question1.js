const fs = require('fs');
const { getMatchesDataFromCsv, getDeliveriesDataFromCsv } = require('./readDataFromCsv');
const matchDataList = getMatchesDataFromCsv();

// Number of matches played per year for all the years in IPL
function numberOfMatchesPlayedPerYearAllYear(matchDataList) {
  const allSeasonCount = new Map();
  for (let i = 0; i < matchDataList.length; i++) {
    if (allSeasonCount.has(matchDataList[i].season)) {
      let value = allSeasonCount.get(matchDataList[i].season) + 1;
      allSeasonCount.set(matchDataList[i].season, value);
    }
    else {
      allSeasonCount.set(matchDataList[i].season, 1);
    }
  }
  for (let [k, v] of allSeasonCount) {
    seasonList.push(k);
    console.log(k, ":", v);
  }
  const result = Object.fromEntries(allSeasonCount);
  const filePath = '/home/durga/Desktop/iplJavascript/src/public/output/matchesPerYear.json'
  fs.writeFile(filePath, JSON.stringify(result, null, 2), 'utf-8', (err) => {
    if (err) {
      console.error('Error writing JSON file:', err);
    } else {
      console.log('matchesPerYear.json file has been successfully created.');
    }
  });
}
numberOfMatchesPlayedPerYearAllYear(matchDataList);