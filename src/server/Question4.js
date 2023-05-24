const fs = require('fs');
const { getMatchesDataFromCsv, getDeliveriesDataFromCsv } = require('./readDataFromCsv');
const matchDataList = getMatchesDataFromCsv();
const deliveryDataList = getDeliveriesDataFromCsv();

// Top 10 economical bowlers in the year 2015
function top10EconomicalBowlersInTheYear2015(matchDataList, deliveryDataList) {
  let idArray = [];
  for (let i = 0; i < matchDataList.length; i++) {
    if (matchDataList[i].season == 2015) {
      idArray.push(matchDataList[i].id);
    }
  }
  const bowlerAndBalls = new Map();
  for (let i = 0; i < idArray.length; i++) {
    for (let j = 0; j < deliveryDataList.length; j++) {
      if (deliveryDataList[j].match_id == idArray[i]) {
        if (bowlerAndBalls.has(deliveryDataList[j].bowler)) {
          let value = bowlerAndBalls.get(deliveryDataList[j].bowler) + 1;
          bowlerAndBalls.set(deliveryDataList[j].bowler, value);
        } else {
          bowlerAndBalls.set(deliveryDataList[j].bowler, 1);
        }
      }
    }
  }
  for (let [k, v] of bowlerAndBalls) {
    bowlerAndBalls.set(k, v / 6);
  }
  const bowlerAndRuns = new Map();
  for (let i = 0; i < idArray.length; i++) {
    for (let j = 0; j < deliveryDataList.length; j++) {
      if (deliveryDataList[j].match_id == idArray[i]) {
        if (bowlerAndRuns.has(deliveryDataList[j].bowler)) {
          let value = bowlerAndRuns.get(deliveryDataList[j].bowler) + parseInt(deliveryDataList[j].total_runs);
          bowlerAndRuns.set(deliveryDataList[j].bowler, value);
        } else {
          bowlerAndRuns.set(deliveryDataList[j].bowler, parseInt(deliveryDataList[j].total_runs));
        }
      }
    }
  }
  const bowlerEconomy = new Map();
  for (let [key, value] of bowlerAndBalls) {
    bowlerEconomy.set(key, (bowlerAndRuns.get(key) / value));
  }
  let top10EconomicalBowlers = new Map();
  for (let [key, value] of bowlerEconomy) {
    if (value < 6.96) {
      top10EconomicalBowlers.set(key, value);
    }
  }
  const result = Object.fromEntries(top10EconomicalBowlers);
  const filePath = '/home/durga/Desktop/iplJavascript/src/public/output/top10EconomicalBowler.json';
  fs.writeFile(filePath, JSON.stringify(result, null, 2), 'utf-8', (err) => {
    if (err) {
      console.error('Error writing JSON file:', err);
    } else {
      console.log('matchesWonPerTeam.json file has been successfully created.');
    }
  });
}
top10EconomicalBowlersInTheYear2015(matchDataList, deliveryDataList);