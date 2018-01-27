import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import PropTypes from 'prop-types';

import {StatsTable,ScoreBoard,StatsPlayerScore,SelectPlayersInTeams,CreateMatch,
  Footer, Router} from './components/'
import registerServiceWorker from "./registerServiceWorker";
import {MatchResultService} from "./services/match-results-service";
import {getAvailablePlayers, switchTeam} from "./lib/teamHelper";
import {sortByKeyName} from "./lib/utils";


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
            matchResults: [],         // Alla matcher som är spelade
            selectedMatchStream: {},  //
            playerList: {},           // Lista med alla spelare med från firebase.
            scoreOfPlayer: {},        // Lista med spelare och poäng.. används i Statstable.
            newMatch: {},
            currentMatch: {id: null, typ: null, serie: null},

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

    static contextTypes = {
      route: PropTypes.string
    } //kommer nu åt vald sida med hjälp av this.context.route

    componentDidMount() {

        MatchResultService.getMatchResults("nhl", "nhl2018").then(response => {
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


    saveMatchResults(playersList, serie, matchId,typ) {
        MatchResultService.setMatchResults(typ, serie, matchId, playersList);

    }

    /**
     * Hämtar specifik match från db och sätter en lyssnare p
     */
    getSelectedMatchStreamOn() {
        let matchObj = {};

        MatchResultService.getMatchStream(this.state.currentMatch).on('value', (snapshot) => {
            matchObj[this.state.currentMatch.id] = snapshot.val();

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
        MatchResultService.getMatchResults("nhl", "nhl2018").then(response => { //köras för att hämta uppdaterad match o visas i StatsTable
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
                MatchResultService.setMatchResults(this.state.currentMatch.typ, this.state.currentMatch.serie, this.state.currentMatch.id, this.state.selectedMatchStream[this.state.currentMatch.id].players)
            });
    }

    /**
     * Tar bort spelare från match
     * Todo: skicka in parametrar för match och event.
     * @param player player att ta bort
     */
    removePlayerFromTeam(player) {
        MatchResultService.removePlayerFromMatch(this.state.currentMatch.typ, this.state.currentMatch.serie, this.state.currentMatch.id, player.name).then(
            this.getSelectedMatchStreamOn()
        );
    }

    getAvailablePlayersAndPlayersInMatch(playersInMatch, availablePlayers) {
        return sortByKeyName(getAvailablePlayers(playersInMatch, availablePlayers))
    };

    getPlayersInCurrentMatch() {
        if (this.state.selectedMatchStream[this.state.currentMatch.id] != null) {
            return this.getAvailablePlayersAndPlayersInMatch(this.state.selectedMatchStream[this.state.currentMatch.id].players, this.state.playerList)
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

          //let page = this.state.currentPage;
          let page = this.context.route;

          let show = "";

          switch(page){
            case "/Score" :
            show= (
              <div>
                <StatsTable
                   players={this.state.scoreOfPlayer} />

               <StatsPlayerScore
                   match={this.state.matchResults}
                   playerScore={this.state.playerList}
                   setScore={this.setScoreOfPlayers} />
              </div>

             );
              break;
            case "/Games" :
              show = (
                <div>
                  <CreateMatch
                    gametypes={gametypes}
                    serie={serie}
                    newGame={this.newGame}
                    onChangeGameType={this.onChangeGameType}
                    onChangeSerie={this.onChangeSerie} />

                    <SelectPlayersInTeams
                        players={this.getPlayersInCurrentMatch()}
                        changeTeam={this.changeTeam}
                        removePlayerFromTeam={this.removePlayerFromTeam} />

                    <ScoreBoard
                        match={this.state.selectedMatchStream}
                        saveMatch={this.saveMatchResults}
                        resetMatch={this.resetPlayerForMatch}
                        serie={this.state.currentMatch.serie} />


                    <button
                      onClick={this.getSelectedMatchStreamOn}>
                      click to update selectedMatchStream
                    </button>
                  </div>
                )
                break;
            case "/Info" :
              console.log("info");
              break;
            default:
              console.log("default");
          }
            return (
                <div>
                    {show}

                    <Footer active={this.context.route}/>

                </div>
            );
        }
    }
}

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));
registerServiceWorker();



/*
  <MenuAtBott changePage={this.changePage} currentPage={this.state.currentPage} />
 */
