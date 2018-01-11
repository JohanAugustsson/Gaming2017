import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import registerServiceWorker from './registerServiceWorker';
import {StatsTable} from './components/stats-table/stats-table.js'
import {ScoreBoard} from './components/scoreboard/scoreboard.js'
import {MatchResultService} from "./services/match-results-service";
import {StatsPlayedMatches} from "./components/stats-played-matches/stats-played-matches.js"
let playerList = require('./mocks/player-list.json');



class App extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
            matchResults: [],
            players: {},
            scoreOfPlayer: playerList
        };
        this.saveMatchResults = this.saveMatchResults.bind(this);
        this.addPlayerForMatch = this.addPlayerForMatch.bind(this);
        this.resetPlayerForMatch = this.resetPlayerForMatch.bind(this);
        this.getPlayerHistory = this.getPlayerHistory.bind(this);
    }

    componentDidMount() {
        MatchResultService.getMatchResults().then(response => {
            this.setState({
                matchResults: response
            });
        });
    }


    saveMatchResults(playersList,serie){

      MatchResultService.setMatchResults(playersList,serie);

    }

    resetPlayerForMatch(){
      this.setState({
        players: {}
      })
    }

    addPlayerForMatch(name,isHomeTeam){
      let playerObj = this.state.players;
      var player = {
        name: name,
        team: "the one",
        isHomeTeam: isHomeTeam,
        game: "Innebandy",
        serie: "innebandy2018"
      }

      let pl = new PlayerForMatch(player);
      playerObj[player.name] = pl[player.name];
      this.setState({
        players: playerObj
      })
    }

    getPlayerHistory(){
      MatchResultService.getMatchResults().then(response => {
          console.log(response)
          return response;
      }).then(match =>{
        let a = Object.keys(match); // Alla matcher i en lista
        console.log(a);
        let scoresOfPlayer = this.state.scoreOfPlayer;


        a.map(x=> {                // Väljer match för match
          let c = (match[x].players);
          let homeTeamScore = 0;
          let awayTeamScore = 0;
          let homePlayers=[];
          let awayPlayers=[];


          if(c){                  // Väljer ut alla spelare i matchen
            let list  = Object.keys(c);
            list.map(j=> {
              let play = (match[x].players[j]);             // play är nu vart enskild spelare
              scoresOfPlayer[play.name].matches+=1;         // spelare: spelad match
              scoresOfPlayer[play.name].gt += play.score;   // spelare: mål totalt spelare
              if(play.isHomeTeam){
                scoresOfPlayer[play.name].matchesHome +=1;  // spelare: hemma match
                scoresOfPlayer[play.name].ga += play.score  // Spelare: gjorda mål hemma
                homeTeamScore+= play.score;                 // laget: mål
                homePlayers.push(j)
              }else{
                scoresOfPlayer[play.name].matchesAway +=1;    //spelare: borta match
                scoresOfPlayer[play.name].ga += play.score   //spelare: gjorda mål borta
                awayTeamScore+=play.score;                   //laget: mål för bortalaget
                awayPlayers.push(j)
              }


            });

          }
          console.log("Match "+homeTeamScore+" - "+ awayTeamScore)
          console.log(homePlayers+" vs "+ awayPlayers)

          // uppaterar hemma mål och borta mål för varje spelare

          homePlayers.map(x=>{
            scoresOfPlayer[x].goalFor += homeTeamScore;
            scoresOfPlayer[x].goalAgainst += awayTeamScore;
            if(homeTeamScore>awayTeamScore){
              scoresOfPlayer[x].wins += 1;   //spelare: vinnare
            }
          });
          awayPlayers.map(x=>{

            scoresOfPlayer[x].goalFor += awayTeamScore;
            scoresOfPlayer[x].goalAgainst += homeTeamScore;
            if(homeTeamScore<awayTeamScore){
              scoresOfPlayer[x].wins += 1;   //spelare: vinnare
            }
          });

        });
        this.setState({   //sparar ner allt till tabell.
          scoreOfPlayer : scoresOfPlayer
        })
      });

    }
    render() {
        return (
            <div>
                <StatsTable matchResult={this.state.matchResults} players={this.state.scoreOfPlayer} add={this.addPlayerForMatch}/>
                <ScoreBoard
                  players={this.state.players}
                  saveMatch={this.saveMatchResults}
                  resetMatch={this.resetPlayerForMatch}
                  serie="innebandy2018"
                />


                <StatsPlayedMatches />
                <button onClick={this.getPlayerHistory}>Test</button>

            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();





class PlayerForMatch{
  constructor(player){
    this[player.name] = {
      assist:0,
      isHomeTeam : player.isHomeTeam,
      name : player.name,
      penalty : 0,
      penaltyShootOutScore : 0,
      penaltyShot: 0,
      penaltyShotScore: 0,
      score: 0,
    }
  }
}
