import React from 'react';


export class StatsPlayerScore extends React.Component{
  constructor(props){
    super(props);

    this.calculateSelectedPlayer = this.calculateSelectedPlayer.bind(this);
    this.calculateScores = this.calculateScores.bind(this);
    this.calculateTeamScores = this.calculateTeamScores.bind(this);
    this.handelClickUpdateScore = this.handelClickUpdateScore.bind(this);

  }



  calculateScores(match,scoreHolder){                               // Väljer match för match  - STEG 1

    let matchKeys = Object.keys(match);
    matchKeys.forEach(selectedMatch =>{

      if(match[selectedMatch].players){                               // kontrollerar så att de finns spelare i matchen
        let playerKeys = Object.keys(match[selectedMatch].players);
        this.calculateSelectedPlayer(selectedMatch,playerKeys,scoreHolder);
      }

    })
  }

  calculateSelectedPlayer(selectedMatch,playerKeys,scoreHolder){                 // Väljer Spelare för spelare   - STEG 2
    let match = (this.props.match);
    let homeTeam  = [];
    let awayTeam = [];
    let homeTeamScore = 0;
    let awayTeamScore = 0;

    playerKeys.forEach(selectedPlayer => {
      let onePlayer = match[selectedMatch].players[selectedPlayer]


      if(onePlayer.isHomeTeam){
        homeTeam.push(onePlayer)
        homeTeamScore+= onePlayer.goalTotal;
      }else{
        awayTeam.push(onePlayer)
        awayTeamScore+= onePlayer.goalTotal;
      }
    })

    this.calculateTeamScores(homeTeam,awayTeam,homeTeamScore,awayTeamScore,scoreHolder);
  }

  calculateTeamScores(homeTeam,awayTeam,homeTeamScore,awayTeamScore,scoreHolder){        // Behandlar och uppdaterar score för lag  - STEG 3
      let awayWinner = 0;
      let homeWinner = 0;
      let draw = 0;

      if(homeTeamScore>awayTeamScore){
        homeWinner = 1;
      }else if (homeTeamScore<awayTeamScore) {
        awayWinner = 1;
      }else{
        draw = 1;
      }




      homeTeam.forEach(selectedPlayer => {  //Poäng för hemmalag
        let playerScore = scoreHolder[selectedPlayer.name];


        scoreHolder[selectedPlayer.name].assist = playerScore.assist + selectedPlayer.assist;
        scoreHolder[selectedPlayer.name].isHomeTeam = playerScore.isHomeTeam;
        scoreHolder[selectedPlayer.name].name = playerScore.name;
        scoreHolder[selectedPlayer.name].matchesPlayed = playerScore.matchesPlayed + 1;
        scoreHolder[selectedPlayer.name].matchesHome = playerScore.matchesHome + 1;
        scoreHolder[selectedPlayer.name].matchesAway = playerScore.matchesAway;
        scoreHolder[selectedPlayer.name].matchesWins = playerScore.matchesWins + homeWinner;
        scoreHolder[selectedPlayer.name].matchesDraw = playerScore.matchesDraw + draw;
        scoreHolder[selectedPlayer.name].goalTotal = playerScore.goalTotal + selectedPlayer.goalTotal;
        scoreHolder[selectedPlayer.name].goalHome =  playerScore.goalHome + selectedPlayer.goalHome;
        scoreHolder[selectedPlayer.name].goalAway =  playerScore.goalAway;
        scoreHolder[selectedPlayer.name].goalFor =  playerScore.goalFor + homeTeamScore;
        scoreHolder[selectedPlayer.name].goalAgainst =  playerScore.goalAgainst + awayTeamScore;

      })

      awayTeam.forEach(selectedPlayer => {  //Poäng för bortalag
        let playerScore = this.props.playerScore[selectedPlayer.name];


        scoreHolder[selectedPlayer.name].assist = playerScore.assist + selectedPlayer.assist;
        scoreHolder[selectedPlayer.name].isHomeTeam = playerScore.isHomeTeam;
        scoreHolder[selectedPlayer.name].name = playerScore.name;
        scoreHolder[selectedPlayer.name].matchesPlayed = playerScore.matchesPlayed + 1;
        scoreHolder[selectedPlayer.name].matchesHome = playerScore.matchesHome;
        scoreHolder[selectedPlayer.name].matchesAway = playerScore.matchesAway + 1;
        scoreHolder[selectedPlayer.name].matchesWins = playerScore.matchesWins + awayWinner;
        scoreHolder[selectedPlayer.name].matchesDraw = playerScore.matchesDraw + draw;
        scoreHolder[selectedPlayer.name].goalTotal = playerScore.goalTotal + selectedPlayer.goalTotal;
        scoreHolder[selectedPlayer.name].goalHome =  playerScore.goalHome;
        scoreHolder[selectedPlayer.name].goalAway = playerScore.goalAway + selectedPlayer.goalAway;
        scoreHolder[selectedPlayer.name].goalFor =  playerScore.goalFor + awayTeamScore;
        scoreHolder[selectedPlayer.name].goalAgainst =  playerScore.goalAgainst + homeTeamScore;

      })



  }

  handelClickUpdateScore(){
    let scoreHolder= this.props.playerScore;
    this.calculateScores(this.props.match,scoreHolder);
    this.props.setScore(scoreHolder);


  }

    render(){


      return(

        <button onClick={this.handelClickUpdateScore}>Update scoreTable</button>
      );
  }



}
