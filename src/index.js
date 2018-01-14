import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

import registerServiceWorker from './registerServiceWorker';
import {StatsTable} from './components/stats-table/stats-table.js'
import {ScoreBoard} from './components/scoreboard/scoreboard.js'
import {MatchResultService} from "./services/match-results-service";
import {StatsPlayerScore} from "./components/stats-player-score/stats-player-score.js"
let playerList = require('./mocks/player-list.json');
let playerList2 = require('./mocks/player-list0.json');



class App extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
            matchResults: [], // Alla matcher som är spelade
            players: {},       // lista med nuvarande spelare..
            scoreOfPlayer: playerList, // Lista med alla som spelat.. lägg till scores

        };
        this.saveMatchResults = this.saveMatchResults.bind(this);
        this.addPlayerForMatch = this.addPlayerForMatch.bind(this);
        this.resetPlayerForMatch = this.resetPlayerForMatch.bind(this);
        this.setScoreOfPlayers = this.setScoreOfPlayers.bind(this);
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

      let addPlayer = new PlayerForMatch(player);
      playerObj[name] = addPlayer[name];
      this.setState({
        players: playerObj
      })

    }

    setScoreOfPlayers(scoreOfPlayer){
      this.setState({
        scoreOfPlayer : scoreOfPlayer
      })
    }




    render() {
        console.log(this.state.players);
        console.log(this.state.scoreOfPlayer);


        return (
            <div>
                <StatsTable players={this.state.scoreOfPlayer} add={this.addPlayerForMatch}/>
                <ScoreBoard
                  players={this.state.players}
                  saveMatch={this.saveMatchResults}
                  resetMatch={this.resetPlayerForMatch}
                  serie="innebandy2018"
                />

                <StatsPlayerScore
                  match={this.state.matchResults}
                  playerScore={playerList}
                  setScore = {this.setScoreOfPlayers}

                />



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
      matchesPlayed: 0,
      matchesHome: 0,
      matchesAway: 0,
      matchesWins: 0,
      goalTotal: 0,
      goalHome: 0,
      goalAway: 0,
      goalFor: 0,
      goalAgainst: 0
    }
  }
}
