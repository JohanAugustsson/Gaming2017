import React from "react";
import {MatchResultService} from "../../services/match-results-service";
import "./scoreboard.css";
import {Counter} from "../counter/counter";

export class ScoreBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [
            {assist:0, isHomeTeam: true, name: "Johan",  penalty:0, penaltyShootOutScore:0, penaltyShot:0, penaltyShotScore:0, score: 0, team:1},
            {assist:0, isHomeTeam: true, name: "Peter",  penalty:0, penaltyShootOutScore:0, penaltyShot:0, penaltyShotScore:0, score: 0, team:1},
            {assist:0, isHomeTeam: false, name: "Niklas", penalty:0, penaltyShootOutScore:0, penaltyShot:0, penaltyShotScore:0, score: 0, team:2},
            {assist:0, isHomeTeam: false, name: "Carl",   penalty:0, penaltyShootOutScore:0, penaltyShot:0, penaltyShotScore:0, score: 0, team:2},
          ],
            homeGoal: 0,
            awayGoal: 0
        };
        this.goal = this.goal.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    addPlayer() {

    }

    handleReset() {
        this.setState({
            players: [{name: "none", score: 0}, {name: "none", score: 0}, {name: "none", score: 0}, {
                name: "none",
                score: 0
            }],
            homeGoal: 0,
            awayGoal: 0
        })
    }


    handleSave(event,){
      MatchResultService.getMatchResults().then(response =>{
        console.log(response);
      });

      let playersList = this.state.players;
      let obj = {};
      playersList.map(x => obj[x.name]=x); //gör om lista till object-träd. Detta för att ej använda listor i databasen.

      MatchResultService.setMatchResults(obj);

    }

    goal(changedScore, playerId) {
        let newPlayList = this.state.players.slice();


        newPlayList[playerId].score = newPlayList[playerId].score + changedScore;

        if (playerId < 2) {
            let homeGoal = this.state.homeGoal + changedScore;
            this.setState({
                players: newPlayList,
                homeGoal: homeGoal
            })
        } else {
            let awayGoal = this.state.awayGoal + changedScore;
            this.setState({
                players: newPlayList,
                awayGoal: awayGoal
            })
        }

    }

    render() {

        return (
            <div>
                <div className="scoreBoard">
                    <div className="header"> SCOREBOARD</div>
                    <div className="home">Home</div>
                    <div className="teamHome">
                        <Counter goal={this.goal} id={0} player={this.state.players[0]}/>
                        <Counter goal={this.goal} id={1} player={this.state.players[1]}/>
                    </div>
                    <div className="score">
                        {this.state.homeGoal} - {this.state.awayGoal}
                    </div>
                    <div className="away">Away</div>
                    <div className="teamAway">
                        <Counter goal={this.goal} id={2} player={this.state.players[2]}/>
                        <Counter goal={this.goal} id={3} player={this.state.players[3]}/>
                    </div>

                    <div>
                        <button onClick={this.handleReset}>Reset</button>
                        <button onClick={this.handleSave}>Save</button>
                    </div>
                </div>
            </div>
        );
    }

}
