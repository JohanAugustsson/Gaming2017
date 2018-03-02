import React from "react";
import PropTypes from 'prop-types';
import "../../index.css";

import {StatsTable,StatsPlayerScore} from '../../components/'
import {MatchResultService} from "../../services/match-results-service";


export class Scores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            matchResults: [],         // Alla matcher som är spelade
            playerList: {},           // Lista med alla spelare med från firebase.
            scoreOfPlayer: {},        // Lista med spelare och poäng.. används i Statstable.
        };
          this.setScoreOfPlayers = this.setScoreOfPlayers.bind(this);
    }

    static contextTypes = {
      route: PropTypes.string
    } //kommer nu åt vald sida med hjälp av this.context.route

    componentDidMount() {

        MatchResultService.getMatchResults("nhl", "nhl2018").then(response => {
            this.setState({
                matchResults: response,
                loading: false
            });
        });

        MatchResultService.getPlayerList().then(response => {
            this.setState({
                playerList: response,
                scoreOfPlayer: response
            });
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




    render() {

        if (this.state.loading) {
            return (<div>loading</div>)

        } else {

            return (
              <div>
                <StatsTable
                   players={this.state.scoreOfPlayer} />

               <StatsPlayerScore
                   match={this.state.matchResults}
                   playerScore={this.state.playerList}
                   setScore={this.setScoreOfPlayers} />
              </div>
            );
        }
    }
}
