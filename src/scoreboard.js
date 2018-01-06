import React from 'react';
import ReactDOM from 'react-dom';
import './css/scoreboard.css';
import PropTypes from 'prop-types';

class Player extends React.Component{
  constructor(props){
    super(props)

    this.state={
      score: 0
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event){
    let player = this.props.pl;
    let add = event.target.innerHTML;
    if(add==="+"){
      this.props.goal(1,player);
    }else {
      this.props.goal(-1,player);
    }
  }
  render(){
    return(
      <div className="player">
        {this.props.player.name}  <span>{this.props.player.score}</span><button onClick={this.handleClick}>+</button> <button onClick={this.handleClick}>-</button>

      </div>

    );
  }
}


Player.propTypes={
  player: PropTypes.object.isRequired
}





export class ScoreBoard extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      players: [{name:"Johan",score:0},{name:"Peter",score:0},{name:"Niklas",score:0},{name:"Carl",score:0}],
      homeGoal: 0,
      awayGoal: 0

    }
    this.goal = this.goal.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  addPlayer(){

  }

  handleReset(){
    this.setState({
      players: [{name:"none",score:0},{name:"none",score:0},{name:"none",score:0},{name:"none",score:0}],
      homeGoal: 0,
      awayGoal: 0
    })
  }

  goal(playerGoal,i){ //playerGoal kan va +1 eller -1    i är vilken spelare som gjort mål
    let newPlayList = this.state.players.slice();


    newPlayList[i].score = newPlayList[i].score + playerGoal;

    if(i<2){
      let homeGoal = this.state.homeGoal + playerGoal
      this.setState({
        players: newPlayList,
        homeGoal: homeGoal
      })
    }else{
      let awayGoal = this.state.awayGoal + playerGoal
      this.setState({
        players: newPlayList,
        awayGoal: awayGoal
      })
    }

  }

  render(){

    return(
      <div>
        <div className="scoreBoard">
            <div className="header"> SCOREBOARD </div>
            <div className="home">Home</div>
            <div className="teamHome">
              <Player goal={this.goal} pl={0} player={this.state.players[0]}/>
              <Player goal={this.goal} pl={1} player={this.state.players[1]}/>
            </div>
            <div className="score">
                 {this.state.homeGoal} - {this.state.awayGoal}
            </div>
            <div className="away">Away</div>
            <div className="teamAway">
              <Player goal={this.goal} pl={2} player={this.state.players[2]}/>
              <Player goal={this.goal} pl={3} player={this.state.players[3]}/>
            </div>

          <div>
            <button onClick={this.handleReset}>Reset</button>
          </div>
        </div>
      </div>
    );
  }

}
