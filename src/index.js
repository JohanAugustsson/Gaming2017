import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import PropTypes from "prop-types";

import {
    CreateMatch,
    Footer,
    Router,
    ScoreBoard,
    SelectPlayersInTeams,
    StatsPlayerScore,
    StatsTable
} from "./components/";
import registerServiceWorker from "./registerServiceWorker";
import {MatchResultService} from "./services/match-results-service";
import {getAvailablePlayers, switchTeam} from "./lib/teamHelper";
import {sortByKeyName} from "./lib/utils";
import {MatchList} from "./components/match-list/match-list";


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
            currentMatch: {id: null, typ: null, serie: null},

        };
        this.saveMatchResults = this.saveMatchResults.bind(this);
        this.setScoreOfPlayers = this.setScoreOfPlayers.bind(this);
        this.changeTeam = this.changeTeam.bind(this);
        this.removePlayerFromTeam = this.removePlayerFromTeam.bind(this);
        this.getAvailablePlayersAndPlayersInMatch = this.getAvailablePlayersAndPlayersInMatch.bind(this);
        this.onChangeSerie = this.onChangeSerie.bind(this);
        this.onChangeGameType = this.onChangeGameType.bind(this);
        this.newGame = this.newGame.bind(this);
        this.getPlayersInCurrentMatch = this.getPlayersInCurrentMatch.bind(this);
        this.onChangeMatch = this.onChangeMatch.bind(this);

    }

    static contextTypes = {
        route: PropTypes.string
    } //kommer nu åt vald sida med hjälp av this.context.route

    componentDidMount() {
        MatchResultService.getPlayerList().then(response => {
            this.setState({
                playerList: response,
                scoreOfPlayer: response
            });
        });
    }


    saveMatchResults(playersList, serie, matchId, typ) {
        MatchResultService.setMatchResults(typ, serie, matchId, playersList);

    }

    getMatchStream(){
        MatchResultService.getMatchResults(this.state.currentMatch.typ, this.state.currentMatch.serie).on('value', (snapshot) => {
            this.setState({
                matchResults: snapshot.val() != null ? snapshot.val() : {}
            });
        });
    }


    setScoreOfPlayers(scoreOfPlayer) {

        MatchResultService.getPlayerList().then(response => {  // Nollställer playerList
            this.setState({
                playerList: response
            });
        });

        this.setState({
            scoreOfPlayer: scoreOfPlayer
        })
    }


    changeTeam(player) {
        let changedMatch = switchTeam({[this.state.currentMatch.id]: this.state.matchResults[this.state.currentMatch.id]}, player.player, player.isHomeTeam);
        this.setState({matchResults: {...this.state.matchResults, ...changedMatch}},
            function () {
                MatchResultService.setMatchResults(this.state.currentMatch.typ, this.state.currentMatch.serie, this.state.currentMatch.id, this.state.matchResults[this.state.currentMatch.id].players)
            });
    }

    /**
     * Tar bort spelare från match
     * Todo: skicka in parametrar för match och event.
     * @param player player att ta bort
     */
    removePlayerFromTeam(player) {
        MatchResultService.removePlayerFromMatch(this.state.currentMatch.typ, this.state.currentMatch.serie, this.state.currentMatch.id, player.name);
    }

    getAvailablePlayersAndPlayersInMatch(playersInMatch, availablePlayers) {
        return sortByKeyName(getAvailablePlayers(playersInMatch, availablePlayers))
    };

    getPlayersInCurrentMatch() {
        if (this.state.matchResults[this.state.currentMatch.id] != null) {
            return this.getAvailablePlayersAndPlayersInMatch(this.state.matchResults[this.state.currentMatch.id].players, this.state.playerList)
        } else return {};
    }

    newGame(event) {
        MatchResultService.createMatch(this.state.currentMatch.typ, this.state.currentMatch.serie).then(response => {
            this.setState({
                currentMatch: {
                    ...this.state.currentMatch, ...{
                        id: response.key,
                        typ: this.state.currentMatch.typ,
                        serie: this.state.currentMatch.serie
                    }
                }
            }, function () {
                this.getMatchStream();
            });
        });
    }

    onChangeGameType(data) {
        this.setState({
            matchResults: {},
            currentMatch: {...this.state.currentMatch, ...{typ: data.value, serie: "", id: ""}}
        })
    }

    onChangeSerie(data) {
        this.setState({
            currentMatch: {
                ...this.state.currentMatch, ...{serie: data.value}
            }
        }, function () {
            this.getMatchStream();
        })
    }

    onChangeMatch(match) {
        this.setCurrentMatch(match);
    }

    setCurrentMatch(match) {
        this.setState({
            currentMatch: {
                ...this.state.currentMatch, ...{
                    id: match.key,
                    typ: match.typ,
                    serie: match.serie
                }
            }
        });
    }


    render() {
            //let page = this.state.currentPage;
            let page = this.context.route;

            let show = "";

            switch (page) {
                case "/Score" :
                    show = (
                        <div>
                            <StatsTable
                                players={this.state.scoreOfPlayer}/>

                            <StatsPlayerScore
                                match={this.state.matchResults}
                                playerScore={this.state.playerList}
                                setScore={this.setScoreOfPlayers}/>
                        </div>

                    );
                    break;
                case "/Games" :
                    show = (
                        <div>
                            <CreateMatch
                                gametypes={gametypes}
                                serie={serie}
                                currentVal={this.state.currentMatch.serie}
                                newGame={this.newGame}
                                onChangeGameType={this.onChangeGameType}
                                onChangeSerie={this.onChangeSerie}/>

                            <MatchList matches={this.state.matchResults} onChangeMatch={this.onChangeMatch}/>

                            <SelectPlayersInTeams
                                players={this.getPlayersInCurrentMatch()}
                                changeTeam={this.changeTeam}
                                removePlayerFromTeam={this.removePlayerFromTeam}/>

                            <ScoreBoard
                                match={{[this.state.currentMatch.id]: this.state.matchResults[this.state.currentMatch.id]}}
                                saveMatch={this.saveMatchResults}
                                resetMatch={this.resetPlayerForMatch}
                                serie={this.state.currentMatch.serie}/>


                            <button
                                onClick={this.getMatchStream}>
                                click to update selectedMatchStream
                            </button>
                        </div>
                    )
                    break;
                case "/Info" :
                    //console.log("info");
                    break;
                default:
                //console.log("default");
            }
            return (
                <div>
                    {show}

                    <Footer active={this.context.route}/>

                </div>
            );
        }

}

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));
registerServiceWorker();


/*
 <MenuAtBott changePage={this.changePage} currentPage={this.state.currentPage} />
 */
