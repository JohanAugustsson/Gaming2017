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




class App extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
            matchResults: [], // Alla matcher som är spelade
            selectedMatchStream: {},  //
            playerList : {},
            scoreOfPlayer: playerList // Används i Statstable för lista på spelare

        };
        this.saveMatchResults = this.saveMatchResults.bind(this);
        this.setScoreOfPlayers = this.setScoreOfPlayers.bind(this);
        this.getSelectedMatchStreamOn = this.getSelectedMatchStreamOn.bind(this);
    }

    componentDidMount() {
        MatchResultService.getMatchResults().then(response => {
            this.setState({
                matchResults: response
            });
        });
        MatchResultService.getPlayerList().then(response => {
            this.setState({
                playerList: response
            });
        });
    }


    saveMatchResults(playersList,serie,matchId){
        console.log(matchId);
      MatchResultService.setMatchResults(playersList,serie,matchId);

    }

    getSelectedMatchStreamOn(){
      let match = 1515849665586   //skall skicka in match till denna.. nu är den satt fast
      let matchObj = {};
        MatchResultService.getSelectedMatchStream(match).then(response => {
        matchObj[match] = response;

        this.setState({
          selectedMatchStream : matchObj
        })

      });

    }




    setScoreOfPlayers(scoreOfPlayer){
      this.setState({
        scoreOfPlayer : scoreOfPlayer
      })
    }




    render() {
        console.log(this.state.players);
        console.log(this.state.scoreOfPlayer);
        console.log("MatchResultsAll:");
        console.log(this.state.matchResults);
        return (
            <div>
                <StatsTable players={this.state.scoreOfPlayer} add={this.addPlayerForMatch}/>
                <ScoreBoard
                  //players={this.state.players}
                  match={this.state.selectedMatchStream}
                  saveMatch={this.saveMatchResults}
                  resetMatch={this.resetPlayerForMatch}
                  serie="innebandy2018"
                />

                <StatsPlayerScore
                  match={this.state.matchResults}
                  playerScore={this.state.playerList}
                  setScore = {this.setScoreOfPlayers}

                />


                <button onClick={this.getSelectedMatchStreamOn}>click to update selectedMatchStream</button>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();



/*

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
*/
