import React from "react";
import "semantic-ui-css/semantic.min.css";
import "../../index.css";
import PropTypes from "prop-types";

import {CreateMatch, ScoreBoard, SelectPlayersInTeams} from "../../components/";
import {MatchResultService} from "../../services/match-results-service";
import {getAvailablePlayers, switchTeam} from "../../lib/teamHelper";
import {sortByKeyName} from "../../lib/utils";
import {MatchList} from "../../components/match-list/match-list";
import Menu from "semantic-ui-react/dist/es/collections/Menu/Menu";
import Grid from "semantic-ui-react/dist/es/collections/Grid/Grid";
import SwipeableViews from 'react-swipeable-views';


let gametypes = [{key: "innebandy", value: "innebandy", text: "innebandy"}, {key: "nhl", value: "nhl", text: "nhl"}];
let serie = [{key: "innebandy2018", value: "innebandy2018", text: "innebandy2018"}, {
    key: "nhl2018",
    value: "nhl2018",
    text: "nhl2018"
}];

const styles = {
    slide: {
        padding: 0,
        minHeight: 100,
    },
    slide1: {
    },
    slide2: {
    },
    slide3: {
    },
};

export class Games extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matchResults: [],         // Alla matcher som är spelade
            selectedMatchStream: {},  //
            playerList: {},           // Lista med alla spelare med från firebase.
            currentMatch: {id: null, typ: null, serie: null},
            activeItem: 'Start game',
            activeItemIndex: 0
        };
        this.saveMatchResults = this.saveMatchResults.bind(this);
        this.changeTeam = this.changeTeam.bind(this);
        this.removePlayerFromTeam = this.removePlayerFromTeam.bind(this);
        this.onChangeSerie = this.onChangeSerie.bind(this);
        this.onChangeGameType = this.onChangeGameType.bind(this);
        this.createMatch = this.createMatch.bind(this);
        this.getPlayersInCurrentMatch = this.getPlayersInCurrentMatch.bind(this);
        this.onChangeMatch = this.onChangeMatch.bind(this);
        this.getNumberFromString = this.getNumberFromString.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeIndex = this.handleChangeIndex.bind(this);

    }

    static contextTypes = {
        route: PropTypes.string
    } //kommer nu åt vald sida med hjälp av this.context.route

    componentDidMount() {
        MatchResultService.getPlayerList().then(response => {
            this.setState({
                playerList: response,
            });
        });
    }

    /**
     * Sparar resultaten för en match.
     * @param playersList
     * @param serie
     * @param matchId
     * @param typ
     */
    saveMatchResults(playersList, serie, matchId, typ) {
        MatchResultService.setMatchResults(typ, serie, matchId, playersList);
    }

    /**
     * Hämtar och lyssnar efter ändringar för en serie.
     */
    getMatchStream() {
        MatchResultService.getMatchResultsStream(this.state.currentMatch.typ, this.state.currentMatch.serie).on('value', (snapshot) => {
            this.setState({
                matchResults: snapshot.val() != null ? snapshot.val() : {}
            });
        });
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
     * @param player spelare att ta bort
     */
    removePlayerFromTeam(player) {
        MatchResultService.removePlayerFromMatch(this.state.currentMatch.typ, this.state.currentMatch.serie, this.state.currentMatch.id, player.name);
    }

    /**
     * Hämtar tillgängliga spelare för en match och sorterar dem i bokstavsordning.
     * @returns {{}}
     */
    getPlayersInCurrentMatch() {
        if (this.state.matchResults[this.state.currentMatch.id] != null) {
            let availablePlayers = getAvailablePlayers(this.state.matchResults[this.state.currentMatch.id].players, this.state.playerList)
            return sortByKeyName(availablePlayers);
        } else return {};
    }

    createMatch(event) {
        MatchResultService.createMatch(this.state.currentMatch.typ, this.state.currentMatch.serie).then(response => {
            this.setState({
                currentMatch: {
                    ...this.state.currentMatch, ...{
                        id: response.key,
                        typ: this.state.currentMatch.typ,
                        serie: this.state.currentMatch.serie
                    }
                },
                activeItem: "Select player in teams"
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
        this.setState({
            currentMatch: {
                ...this.state.currentMatch, ...{
                    id: match.key,
                    typ: match.typ,
                    serie: match.serie
                }
            },
            activeItemIndex: 1
        });
    }

    stepPages() {
        switch (this.state.activeItem) {
            case ('Start game'):
                return <div>
                    {/*<CreateMatch*/}
                    {/*gametypes={gametypes}*/}
                    {/*serie={serie}*/}
                    {/*currentVal={this.state.currentMatch.serie}*/}
                    {/*createMatch={this.createMatch}*/}
                    {/*onChangeGameType={this.onChangeGameType}*/}
                    {/*onChangeSerie={this.onChangeSerie}/><br/><br/>*/}
                    {/*<MatchList matches={this.state.matchResults} onChangeMatch={this.onChangeMatch}/>*/}
                </div>;
            case ("Select player in teams"):
                return <div>
                    {/*<SelectPlayersInTeams*/}
                    {/*players={this.getPlayersInCurrentMatch()}*/}
                    {/*changeTeam={this.changeTeam}*/}
                    {/*removePlayerFromTeam={this.removePlayerFromTeam}/>*/}
                </div>;

            case ("Score"):
                return <div>
                    {/*<ScoreBoard*/}
                    {/*match={{[this.state.currentMatch.id]: this.state.matchResults[this.state.currentMatch.id]}}*/}
                    {/*saveMatch={this.saveMatchResults}*/}
                    {/*resetMatch={this.resetPlayerForMatch}*/}
                    {/*serie={this.state.currentMatch.serie}/>*/}
                </div>;
            default:
                return <div/>
        }
    }

    handleChange = (event, value) => {
        this.setState({
            activeItemIndex: value,
        }, function () {
            console.log(this.state.activeItemIndex);
        });
    };

    handleChangeIndex = index => {
        this.setState({
            activeItemIndex: index
        });
    };

    getNumberFromString(name) {

        if (name === 'Start game') {
            return 0;
        } else if (name === 'Select player in teams') {

            return 1;
        } else {
            return 2;
        }
    }

    handleItemClick = (e, {name}) => this.setState({activeItemIndex: this.getNumberFromString(name)});

    render() {
        let viewPage = this.stepPages();
        return (

            <div>
                <Grid id="griden">
                    <Grid.Column mobile="16" table="5" computer="16">
                        <Menu inverted pointing secondary widths="3">
                            <Menu.Item name='Start game' active={this.state.activeItemIndex === 0}
                                       onClick={this.handleItemClick}/>
                            <Menu.Item name='Select player in teams'
                                       active={this.state.activeItemIndex === 1}
                                       onClick={this.handleItemClick}/>
                            <Menu.Item name='Score' active={this.state.activeItemIndex === 2}
                                       onClick={this.handleItemClick}/>
                        </Menu></Grid.Column>
                </Grid>
                <SwipeableViews enableMouseEvents index={this.state.activeItemIndex} onChangeIndex={this.handleChangeIndex}>
                    <div style={Object.assign({}, styles.slide, styles.slide1)}>
                        <div className="fullheight">
                            <CreateMatch
                                gametypes={gametypes}
                                serie={serie}
                                currentVal={this.state.currentMatch.serie}
                                createMatch={this.createMatch}
                                onChangeGameType={this.onChangeGameType}
                                onChangeSerie={this.onChangeSerie}/><br/><br/>
                            <MatchList matches={this.state.matchResults} onChangeMatch={this.onChangeMatch}/>
                        </div>
                    </div>
                    <div style={Object.assign({}, styles.slide, styles.slide2)}>
                        <div className="fullheight">
                            <SelectPlayersInTeams
                                players={this.getPlayersInCurrentMatch()}
                                changeTeam={this.changeTeam}
                                removePlayerFromTeam={this.removePlayerFromTeam}/>
                        </div>
                    </div>
                    <div style={Object.assign({}, styles.slide, styles.slide3)}>
                        <div className="fullheight">
                            <ScoreBoard
                                match={{[this.state.currentMatch.id]: this.state.matchResults[this.state.currentMatch.id]}}
                                saveMatch={this.saveMatchResults}
                                resetMatch={this.resetPlayerForMatch}
                                serie={this.state.currentMatch.serie}/>
                        </div>
                    </div>
                </SwipeableViews>


                <Grid id="griden" verticalAlign='middle'>
                    <Grid.Row>
                        <Grid.Column mobile="16" table="16" computer="16">
                            {viewPage}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </div>
        );
    }


}
