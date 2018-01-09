import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import registerServiceWorker from './registerServiceWorker';
import {StatsTable} from './components/stats-table/stats-table.js'
import {ScoreBoard} from './components/scoreboard/scoreboard.js'
import {MatchResultService} from "./services/match-results-service";

let playerList = require('./mocks/player-list.json');



/*let pl1 ={
Johan: {assist:0, isHomeTeam: true, name: "Johan",  penalty:0, penaltyShootOutScore:0, penaltyShot:0, penaltyShotScore:0, score: 0, team:1},
Peter: {assist:0, isHomeTeam: true, name: "Peter",  penalty:0, penaltyShootOutScore:0, penaltyShot:0, penaltyShotScore:0, score: 0, team:1},
Niklas: {assist:0, isHomeTeam: false, name: "Niklas", penalty:0, penaltyShootOutScore:0, penaltyShot:0, penaltyShotScore:0, score: 0, team:2},
Carl: {assist:0, isHomeTeam: false, name: "Carl",   penalty:0, penaltyShootOutScore:0, penaltyShot:0, penaltyShotScore:0, score: 0, team:2},

};
*/
let pl1 ={

}
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

    render() {
        return (
            <div>
                <StatsTable players={playerList} add={this.addPlayerForMatch}/>
                <ScoreBoard
                  players={this.state.players}
                  saveMatch={this.saveMatchResults}
                  resetMatch={this.resetPlayerForMatch}
                  serie="innebandy2018"
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
      penalty : 0,
      penaltyShootOutScore : 0,
      penaltyShot: 0,
      penaltyShotScore: 0,
      score: 0,
    }
  }
}
