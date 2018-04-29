import React from 'react';
import { MatchResultService } from "../../services/match-results-service";
import { GameBoard } from "../../components/";

export class GameList extends React.Component {  // Visar alla games i vald Event
  constructor(props){
    super(props);
    this.state = {
      selectedGame: ""
    }
  }

  showInfo=(game)=> {
    this.setState({
      selectedGame : this.props.games[game]
    })
  }

  render(){
    let games = this.props.games
    let evenstArray = [];
    for(let game in games){ // renderar lista med alla games
        evenstArray.push(
          <li key={game}>
            Nb: { games[game].id } <br />
            Date: { games[game].date }
            <button onClick= { () => this.showInfo(game) }>Show Game Info</button>
          </li>
        )
    }


    let gameBoard = "No game selected"
    if(this.state.selectedGame!== ""){
      gameBoard = <GameBoard selectedGame={ this.state.selectedGame }/>
    }

    return(
      <div>
        Games in Event
        <ul>
        { evenstArray.length > 0 ? evenstArray : <li>"No games"</li> }
        </ul>

        { gameBoard }
      </div>

    )
  }
}
