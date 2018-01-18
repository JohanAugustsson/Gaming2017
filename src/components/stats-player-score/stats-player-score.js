import React from 'react';


export class StatsPlayerScore extends React.Component {
    constructor(props) {
        super(props);

        this.calculateSelectedPlayer = this.calculateSelectedPlayer.bind(this);
        this.calculateScores = this.calculateScores.bind(this);
        this.calculateTeamScores = this.calculateTeamScores.bind(this);
        this.handelClickUpdateScore = this.handelClickUpdateScore.bind(this);

    }


    calculateScores(match) {                               // Väljer match för match  - STEG 1
        let matchKeys = Object.keys(match);
        matchKeys.map(selectedMatch => {
            let playerKeys = Object.keys(match[selectedMatch].players);
            this.calculateSelectedPlayer(selectedMatch, playerKeys);
        })
    }

    calculateSelectedPlayer(selectedMatch, playerKeys) {                 // Väljer Spelare för spelare   - STEG 2
        let match = (this.props.match);
        let homeTeam = [];
        let awayTeam = [];
        let homeTeamScore = 0;
        let awayTeamScore = 0;

        playerKeys.map(selectedPlayer => {
            let onePlayer = match[selectedMatch].players[selectedPlayer]

            if (onePlayer.playsForTeam === 1) {
                homeTeam.push(onePlayer)
                homeTeamScore += onePlayer.goalTotal;
            } else {
                awayTeam.push(onePlayer)
                awayTeamScore += onePlayer.goalTotal;
            }
        })

        this.calculateTeamScores(homeTeam, awayTeam, homeTeamScore, awayTeamScore);
    }

    calculateTeamScores(homeTeam, awayTeam, homeTeamScore, awayTeamScore) {        // Behandlar och uppdaterar score för lag  - STEG 3
        let awayWinner = 0;
        let homeWinner = 1;
        if (homeTeamScore < awayTeamScore) {
            awayWinner = 1;
            homeWinner = 0;
        }

        //let playerScore = this.props.playerScore;


        homeTeam.map(selectedPlayer => {
            let playerScore = this.props.playerScore[selectedPlayer.name];

            playerScore = {
                assist: playerScore.assist + selectedPlayer.assist,
                playsForTeam: playerScore.playsForTeam,
                name: playerScore.name,
                matchesPlayed: playerScore.matchesPlayed + 1,
                matchesHome: playerScore.matchesHome + 1,
                matchesAway: playerScore.matchesAway,
                matchesWins: playerScore.matchesWins + homeWinner,
                goalTotal: playerScore.goalTotal + selectedPlayer.goalTotal,
                goalHome: playerScore.goalHome + selectedPlayer.goalHome,
                goalAway: playerScore.goalAway,
                goalFor: playerScore.goalFor + homeTeamScore,
                goalAgainst: playerScore.goalAgainst + awayTeamScore,
            }


            this.props.playerScore[selectedPlayer.name] = playerScore;

        })

        awayTeam.map(selectedPlayer => {
            let playerScore = this.props.playerScore[selectedPlayer.name];

            playerScore = {
                assist: playerScore.assist + selectedPlayer.assist,
                playsForTeam: playerScore.playsForTeam,
                name: playerScore.name,
                matchesPlayed: playerScore.matchesPlayed + 1,
                matchesHome: playerScore.matchesHome,
                matchesAway: playerScore.matchesAway + 1,
                matchesWins: playerScore.matchesWins + awayWinner,
                goalTotal: playerScore.goalTotal + selectedPlayer.goalTotal,
                goalHome: playerScore.goalHome,
                goalAway: playerScore.goalAway + selectedPlayer.goalAway,
                goalFor: playerScore.goalFor + awayTeamScore,
                goalAgainst: playerScore.goalAgainst + homeTeamScore,
            }

            this.props.playerScore[selectedPlayer.name] = playerScore;
        })
        let score = this.props.playerScore;
    }

    handelClickUpdateScore() {
        let playerScore = {};
        this.calculateScores(this.props.match, this.props.playerScore);
        this.props.setScore(this.props.playerScore);
    }

    render() {

        return (

            <button onClick={this.handelClickUpdateScore}>Update scoreTable</button>
        );
    }


}
