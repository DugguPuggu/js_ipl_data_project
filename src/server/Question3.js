const fs = require('fs');
const { getMatchesDataFromCsv, getDeliveriesDataFromCsv } = require('./readDataFromCsv');
const matchDataList = getMatchesDataFromCsv();
const deliveryDataList = getDeliveriesDataFromCsv();

// Extra runs conceded per team in the year 2016
function extraRunsConcededPerTeamInTheYear2016(matchDataList, deliveryDataList) {
  let idList = [];
  for (let i = 0; i < matchDataList.length; i++) {
    if (matchDataList[i].season == 2016) {
      idList.push(matchDataList[i].id);
    }
  }
  const extraRuns = new Map();
  for (let i = 0; i < idList.length; i++) {
    for (let j = 0; j < deliveryDataList.length; j++) {
      if (deliveryDataList[j].match_id == idList[i]) {
        if (extraRuns.has(deliveryDataList[j].bowling_team)) {
          let value = extraRuns.get(deliveryDataList[j].bowling_team) + parseInt(deliveryDataList[j].extra_runs);
          extraRuns.set(deliveryDataList[j].bowling_team, value);
        } else {
          extraRuns.set(deliveryDataList[j].bowling_team, parseInt(deliveryDataList[j].extra_runs));
        }
      }
    }
  }
  for (let [key, value] of extraRuns) {
    console.log(key + " : " + value);
  }
  const result = Object.fromEntries(extraRuns);
  const filePath = '/home/durga/Desktop/iplJavascript/src/public/output/extraRunsPerTeam2016.json';
  fs.writeFile(filePath, JSON.stringify(result, null, 2), 'utf-8', (err) => {
    if (err) {
      console.error('Error writing JSON file:', err);
    } else {
      console.log('extraRunsPerTeam2016.json file has been successfully created.');
    }
  });
}
extraRunsConcededPerTeamInTheYear2016(matchDataList, deliveryDataList);