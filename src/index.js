import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

import registerServiceWorker from './registerServiceWorker';
import {StatsTable} from './components/stats-table/stats-table.js'
import {ScoreBoard} from './components/scoreboard/scoreboard.js'
import {MatchResultService} from "./services/match-results-service";
import {StatsPlayerScore} from "./components/stats-player-score/stats-player-score.js"
import {SelectPlayersInTeams} from "./components/select-players-in-teams/select-players-in-teams";
import {getAvailablePlayers, switchTeam} from "./lib/teamHelper";
import {sortByKeyName} from "./lib/utils";
import {CreateMatch} from "./components/create-match/create-match";
let playerList = require('./mocks/player-list.json');
let gametypes = [{key: "innebandy", value: "innebandy", text: "innebandy"}, {key: "nhl", value: "nhl", text: "nhl"}];
let serie = [{key: "innebandy2018", value: "innebandy2018", text: "innebandy2018"}, {
    key: "nhl2018",
    value: "nhl2018",
    text: "nhl2018"
}];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            matchResults: [], // Alla matcher som är spelade
            selectedMatchStream: {},  //
            playerList: {},   // Används för att hämta spel lista.
            scoreOfPlayer: {}, // Används i Statstable för lista på spelare.
            newMatch: {},
            currentMatch: {id: null, typ: null, serie: null}
        };
        this.saveMatchResults = this.saveMatchResults.bind(this);
        this.setScoreOfPlayers = this.setScoreOfPlayers.bind(this);
        this.getSelectedMatchStreamOn = this.getSelectedMatchStreamOn.bind(this);
        this.changeTeam = this.changeTeam.bind(this);
        this.removePlayerFromTeam = this.removePlayerFromTeam.bind(this);
        this.getAvailablePlayersAndPlayersInMatch = this.getAvailablePlayersAndPlayersInMatch.bind(this);
        this.onChangeSerie = this.onChangeSerie.bind(this);
        this.onChangeGameType = this.onChangeGameType.bind(this);
        this.newGame = this.newGame.bind(this);
        this.getPlayersInCurrentMatch = this.getPlayersInCurrentMatch.bind(this);
    }

    componentDidMount() {
        MatchResultService.getMatchResults().then(response => {
            this.setState({
                matchResults: response
            });
        });
        MatchResultService.getPlayerList().then(response => {
            this.setState({
                playerList: response,
                scoreOfPlayer: response
            });
        });
        this.getSelectedMatchStreamOn();

    }


    saveMatchResults(playersList, serie, matchId) {
        MatchResultService.setMatchResults(playersList, serie, matchId);

    }

    getSelectedMatchStreamOn() {
        // let match = this.state.currentMatch.id;   //skall skicka in match till denna.. nu är den satt fast

        let matchObj = {};

        MatchResultService.getSelectedMatchStream(this.state.currentMatch).then(response => {

            matchObj[this.state.currentMatch.id] = response;

            this.setState({
                selectedMatchStream: matchObj,
                loading: false,
            })
        });


    }


    setScoreOfPlayers(scoreOfPlayer) {

        MatchResultService.getPlayerList().then(response => {  // Nollställer playerList
            this.setState({
                playerList: response
            });
        });
        MatchResultService.getMatchResults().then(response => { //köras för att hämta uppdaterad match o visas i StatsTable
            this.setState({
                matchResults: response
            });
        });


        this.setState({
            scoreOfPlayer: scoreOfPlayer
        })
    }


    changeTeam(player) {
        this.setState({selectedMatchStream: switchTeam(this.state.selectedMatchStream, player.player, player.isHomeTeam)},
            function () {
                MatchResultService.setMatchResults(this.state.selectedMatchStream[this.state.currentMatch.id].players, this.state.currentMatch.serie, this.state.currentMatch.id)
            });
    }

    /**
     * Tar bort spelare från match
     * Todo: skicka in parametrar för match och event.
     * @param player player att ta bort
     */
    removePlayerFromTeam(player) {
        MatchResultService.removePlayerFromMatch("innebandy", "innebandy2018", this.state.currentMatch.id, player.name).then(
            this.getSelectedMatchStreamOn()
        );
    }

    getAvailablePlayersAndPlayersInMatch(playersInMatch, availablePlayers) {
        return sortByKeyName(getAvailablePlayers(playersInMatch, availablePlayers))
    };

    getPlayersInCurrentMatch() {
        if (this.state.selectedMatchStream[this.state.currentMatch.id] != null) {
            return this.getAvailablePlayersAndPlayersInMatch(this.state.selectedMatchStream[this.state.currentMatch.id].players, playerList)
        } else return {};
    }

    newGame(event) {
        MatchResultService.createMatch(this.state.newMatch.typ, this.state.newMatch.serie).then(response => {
            this.setState({
                newMatch: {...this.state.newMatch, ...{matchId: response.key}},
                currentMatch: {
                    ...this.state.currentMatch, ...{
                        id: response.key,
                        typ: this.state.newMatch.typ,
                        serie: this.state.newMatch.serie
                    }
                }
            }, function () {
                this.getSelectedMatchStreamOn();
            });
        });
    }

    onChangeGameType(data) {
        this.setState({
            newMatch: {...this.state.newMatch, ...{typ: data.value}}
        })
    }

    onChangeSerie(data) {
        this.setState({
            newMatch: {...this.state.newMatch, ...{serie: data.value}}
        });
    }


    render() {
        if (this.state.loading) {
            return (<div>loading</div>)

        } else {
            return (
                <div>


                    <StatsTable players={this.state.scoreOfPlayer} add={this.addPlayerForMatch}/>

                    <CreateMatch gametypes={gametypes} serie={serie} newGame={this.newGame}
                                 onChangeGameType={this.onChangeGameType} onChangeSerie={this.onChangeSerie}/>

                    <SelectPlayersInTeams
                        players={this.getPlayersInCurrentMatch()}
                        changeTeam={this.changeTeam}
                        removePlayerFromTeam={this.removePlayerFromTeam}/>

                    <ScoreBoard
                        //players={this.state.players}
                        match={this.state.selectedMatchStream}
                        saveMatch={this.saveMatchResults}
                        resetMatch={this.resetPlayerForMatch}
                        serie={this.state.currentMatch.serie}
                    />

                    <StatsPlayerScore
                        match={this.state.matchResults}
                        playerScore={this.state.playerList}
                        setScore={this.setScoreOfPlayers}

                    />


                    <button onClick={this.getSelectedMatchStreamOn}>click to update selectedMatchStream</button>


                </div>
            );
        }
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
