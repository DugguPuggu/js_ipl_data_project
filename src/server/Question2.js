const fs = require('fs');
const { getMatchesDataFromCsv, getDeliveriesDataFromCsv } = require('./readDataFromCsv');
const matchDataList = getMatchesDataFromCsv();

// Number of matches won per team per year in IPL
function numberOfMatchesWonPerTeamPerYear(matchDataList) {
    const totalMatchesWonPerTeamPerYear = new Map()
    for (let i = 0; i < matchDataList.length; i++) {
        totalMatchesWonPerTeamPerYear.set(matchDataList[i].season, null)
    }
    for (let [key, value] of totalMatchesWonPerTeamPerYear) {
        const allWinnerCount = new Map();

        for (let j = 0; j < matchDataList.length; j++) {
            if (matchDataList[j].season == key) {
                if (allWinnerCount.has(matchDataList[j].winner)) {
                    let value = allWinnerCount.get(matchDataList[j].winner) + 1;
                    allWinnerCount.set(matchDataList[j].winner, value);
                }
                else {
                    allWinnerCount.set(matchDataList[j].winner, 1);
                }
            }
        }
        totalMatchesWonPerTeamPerYear.set(key, allWinnerCount);
    }
    const Object = {};
    for (const [key, value] of totalMatchesWonPerTeamPerYear) {
        Object[key] = Object.fromEntries(value);
    }
    const filePath = '/home/durga/Desktop/iplJavascript/src/public/output/matchesWonPerTeam.json'
    fs.writeFile(filePath, JSON.stringify(plainObject, null, 2), 'utf-8', (err) => {
        if (err) {
            console.error('Error writing JSON file:', err)
        } else {
            console.log('matchesWonPerTeam.json file has been successfully created.')
        }
    });
}
numberOfMatchesWonPerTeamPerYear(matchDataList);