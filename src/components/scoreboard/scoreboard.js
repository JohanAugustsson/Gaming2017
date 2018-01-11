import React from "react";
import "./scoreboard.css";
import {Counter} from "../counter/counter";



export class ScoreBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            players: {},
            homeGoal: 0,
            awayGoal: 0,
            serie: "innebandy2018"
        };
        this.goal = this.goal.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleSave = this.handleSave.bind(this);

    }



    handleReset() {
      this.props.resetMatch();
    }


    handleSave(event){
      let playersList = this.props.players;
      let serie = this.props.serie;
      this.props.saveMatch(playersList,serie);

    }

    goal(changedScore, player) {
        let list = this.props.players;
        list[player.name].score +=changedScore;

        if (player.isHomeTeam) {
            let homeGoal = this.state.homeGoal + changedScore;
            this.setState({
                players: list,
                homeGoal: homeGoal
            })
        } else {
            let awayGoal = this.state.awayGoal + changedScore;
            this.setState({
                players: list,
                awayGoal: awayGoal
            })
        }

    }

    render() {
        let names = Object.keys(this.props.players)
        let obj = this.props.players
        let listPlay = names.map(x=> {
          return obj[x];
        });

        let homeTeam = listPlay.filter(x=>x.isHomeTeam);
        let awayTeam = listPlay.filter(x=>!x.isHomeTeam);

        homeTeam = homeTeam.map( (x,index) =>{
          return <Counter key={index} id={index} goal={this.goal} player={x} />;
        })
        awayTeam = awayTeam.map( (x,index) =>{
          return <Counter key={index} id={index} goal={this.goal} player={x} />;
        })

        return (
            <div>
                <div className="scoreBoard">
                    <div className="header"> SCOREBOARD</div>
                    <div className="home">Home</div>
                    <div className="teamHome">
                        {homeTeam}
                    </div>
                    <div className="score">
                        {this.state.homeGoal} - {this.state.awayGoal}
                    </div>
                    <div className="away">Away</div>
                    <div className="teamAway">
                        {awayTeam}
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
