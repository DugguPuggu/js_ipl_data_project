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

module.exports = {getMatchesDataFromCsv, getDeliveriesDataFromCsv};