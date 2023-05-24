const fs = require('fs');

// Constants
const ID = 0;
const SEASON = 1;
const CITY = 2;
const DATE = 3;
const TEAM1 = 4;
const TEAM2 = 5;
const TOSS_WINNER = 6;
const TOSS_DECISION = 7;
const RESULT = 8;
const DL_APPLIED = 9;
const WINNER = 10;
const WIN_BY_RUNS = 11;
const WIN_BY_WICKETS = 12;
const PLAYER_OF_THE_MATCH = 13;
const VENUE = 14;
const MATCH_ID = 0;
const INNING = 1;
const BATTING_TEAM = 2;
const BOWLING_TEAM = 3;
const OVER = 4;
const BALL = 5;
const BATSMAN = 6;
const NON_STRIKER = 7;
const BOWLER = 8;
const IS_SUPER_OVER = 9;
const WIDE_RUNS = 10;
const BYE_RUNS = 11;
const LEGBYE_RUNS = 12;
const NOBALL_RUNS = 13;
const PENALTY_RUNS = 14;
const BATSMAN_RUNS = 15;
const EXTRA_RUNS = 16;
const TOTAL_RUNS = 17;
const PLAYER_DISMISSED = 18;
const DISMISSAL_KIND = 19;
const FIELDER = 20;

// Read matches data from CSV
function getMatchesDataFromCsv() {
  const matchDataList = [];
  const data = fs.readFileSync('/home/durga/IdeaProjects/MountblueIpl/rcs/matches.csv', 'utf8');
  const lines = data.split('\n');
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line) {
      const values = line.split(',');
      const match = {
        id: values[ID],
        season: values[SEASON],
        city: values[CITY],
        date: values[DATE],
        team1: values[TEAM1],
        team2: values[TEAM2],
        toss_winner: values[TOSS_WINNER],
        toss_decision: values[TOSS_DECISION],
        result: values[RESULT],
        dl_applied: values[DL_APPLIED],
        winner: values[WINNER],
        win_by_runs: values[WIN_BY_RUNS],
        win_by_wickets: values[WIN_BY_WICKETS],
        player_of_match: values[PLAYER_OF_THE_MATCH],
        venue: values[VENUE]
      };
      matchDataList.push(match);
    }
  }
  return matchDataList;
}

// Read deliveries data from CSV
function getDeliveriesDataFromCsv() {
  const deliveryDataList = [];
  const data = fs.readFileSync('/home/durga/IdeaProjects/MountblueIpl/rcs/deliveries.csv', 'utf8');
  const lines = data.split('\n');
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line) {
      const values = line.split(',');
      const delivery = {
        match_id: values[MATCH_ID],
        inning: values[INNING],
        batting_team: values[BATTING_TEAM],
        bowling_team: values[BOWLING_TEAM],
        over: values[OVER],
        ball: values[BALL],
        batsman: values[BATSMAN],
        non_striker: values[NON_STRIKER],
        bowler: values[BOWLER],
        is_superover: values[IS_SUPER_OVER],
        wide_runs: values[WIDE_RUNS],
        bye_runs: values[BYE_RUNS],
        legbye_runs: values[LEGBYE_RUNS],
        noball_runs: values[NOBALL_RUNS],
        penalty_runs: values[PENALTY_RUNS],
        batsman_runs: values[BATSMAN_RUNS],
        extra_runs: values[EXTRA_RUNS],
        total_runs: values[TOTAL_RUNS]
    };
    deliveryDataList.push(delivery);
    }
  }
  return deliveryDataList;
}

let seasonList = [];

// Number of matches played per year for all the years in IPL
function numberOfMatchesPlayedPerYearAllYear(matchDataList) {
  const allSeasonCount = new Map();
  for(let i=0; i<matchDataList.length; i++){
    if(allSeasonCount.has(matchDataList[i].season)){
      let value = allSeasonCount.get(matchDataList[i].season) +1;
      allSeasonCount.set(matchDataList[i].season, value);
    }
    else{
      allSeasonCount.set(matchDataList[i].season, 1);
    }
  }
  for(let [k,v] of allSeasonCount){
    seasonList.push(k);
    console.log(k,":", v);
  } 
}
numberOfMatchesPlayedPerYearAllYear(getMatchesDataFromCsv());

// Number of matches won per team per year in IPL
function numberOfMatchesWonPerTeamPerYear(matchDataList){
  for(let i=0; i<seasonList.length; i++){
    let x = seasonList[i];
    console.log(x);
    const allWinnerCount = new Map();

    for(let j=0; j<matchDataList.length; j++){
      if(matchDataList[j].season == x){
        if(allWinnerCount.has(matchDataList[j].winner)){
          let value = allWinnerCount.get(matchDataList[j].winner) +1;
          allWinnerCount.set(matchDataList[j].winner, value);
        }
        else{
          allWinnerCount.set(matchDataList[j].winner, 1);
        }
      }
    }
    for(let [k,v] of allWinnerCount){
      console.log(k,":", v);
    }
  }
}  
numberOfMatchesWonPerTeamPerYear(getMatchesDataFromCsv());

// Extra runs conceded per team in the year 2016
function extraRunsConcededPerTeamInTheYear2016(matchDataList, deliveryDataList){
  let idList = [];
  for(let i=0; i<matchDataList.length; i++){
    if(matchDataList[i].season == 2016){
      idList.push(matchDataList[i].id);
    }
  }
  const extraRuns = new Map();
  for(let i=0; i<idList.length; i++){
    for(let j=0; j<deliveryDataList.length; j++){
      if(deliveryDataList[j].match_id == idList[i]){
        if(extraRuns.has(deliveryDataList[j].bowling_team)){
          let value = extraRuns.get(deliveryDataList[j].bowling_team) + parseInt(deliveryDataList[j].extra_runs);
          extraRuns.set(deliveryDataList[j].bowling_team, value);
        }else{
          extraRuns.set(deliveryDataList[j].bowling_team, parseInt(deliveryDataList[j].extra_runs));
        }
      }
    }
  }
  for(let [key,value] of extraRuns){
    console.log(key+" : "+ value);
  }
}
extraRunsConcededPerTeamInTheYear2016(getMatchesDataFromCsv(),getDeliveriesDataFromCsv());

// Top 10 economical bowlers in the year 2015
function top10EconomicalBowlersInTheYear2015(matchDataList, deliveryDataList){
  let idArray = [];
  for(let i=0; i<matchDataList.length; i++){
    if(matchDataList[i].season == 2015){
      idArray.push(matchDataList[i].id);
    }
  }
  const bowlerAndBalls = new Map();
  for(let i=0; i<idArray.length; i++){
    for(let j=0; j<deliveryDataList.length; j++){
      if(deliveryDataList[j].match_id == idArray[i]){
        if(bowlerAndBalls.has(deliveryDataList[j].bowler)){
          let value = bowlerAndBalls.get(deliveryDataList[j].bowler) + 1;
          bowlerAndBalls.set(deliveryDataList[j].bowler, value);
        }else{
          bowlerAndBalls.set(deliveryDataList[j].bowler, 1);
        }
      }
    }
  }
  for(let [k, v] of bowlerAndBalls){
    bowlerAndBalls.set(k, v/6);
  }
  const bowlerAndRuns = new Map();
  for(let i=0; i<idArray.length; i++){
    for(let j=0; j<deliveryDataList.length; j++){
      if(deliveryDataList[j].match_id == idArray[i]){
        if(bowlerAndRuns.has(deliveryDataList[j].bowler)){
          let value = bowlerAndRuns.get(deliveryDataList[j].bowler) + parseInt(deliveryDataList[j].total_runs);
          bowlerAndRuns.set(deliveryDataList[j].bowler, value);
        }else{
          bowlerAndRuns.set(deliveryDataList[j].bowler, parseInt(deliveryDataList[j].total_runs));
        }
      }
    }
  }
  const bowlerEconomy = new Map();
  for(let [key, value] of bowlerAndBalls){
    bowlerEconomy.set(key, (bowlerAndRuns.get(key)/value));
  }
  for(let [key, value] of bowlerEconomy){
    if(value<6.96){
      console.log(key+" : "+ value);
    }
  }
}
// top10EconomicalBowlersInTheYear2015(getMatchesDataFromCsv(),getDeliveriesDataFromCsv());