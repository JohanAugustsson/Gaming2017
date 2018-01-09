import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import registerServiceWorker from './registerServiceWorker';
import {StatsTable} from './components/stats-table/stats-table.js'
import {ScoreBoard} from './components/scoreboard/scoreboard.js'
import {MatchResultService} from "./services/match-results-service";

let playerList = require('./mocks/player-list.json');



class App extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
            matchResults: [],
            players: {}
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




      });
    }
    render() {
        return (
            <div>
                <StatsTable matchResult={this.state.matchResults} players={playerList} add={this.addPlayerForMatch}/>
                <ScoreBoard
                  players={this.state.players}
                  saveMatch={this.saveMatchResults}
                  resetMatch={this.resetPlayerForMatch}
                  serie="innebandy2018"
                />


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
