import React from 'react';
import { MatchResultService } from "../../services/match-results-service";
import { GameBoard } from "../../components/";

export class GameList extends React.Component {  // Visar alla games i vald Event
  constructor(props){
    super(props);
    this.state = {
      selectedGame: "",
      gameLogg : [],
      gameMembers : null,
      allUsers : null
    }
  }

  showInfo=(game)=> {
    this.setState({
      selectedGame : this.props.games[game]
    })
    this.updateGameBasInfo();
  }

  updateGameBasInfo = () =>{
    let gameId = this.state.selectedGame.id;
    this.setState({gameLogg: [], allUsers: null, gameMembers: null});

    Promise.all([
      new Promise((onSuccess, onFailure) => {
        MatchResultService.getGameLoggStream(gameId).on('child_added', snapp =>{
          let logg = snapp.val()
          let gameLogg = this.state.gameLogg.map(x=>x);
          gameLogg.push(logg)
          this.setState({gameLogg : gameLogg})
          onSuccess();
        })
      }),

      new Promise((onSuccess, onFailure) => {
        MatchResultService.getUsersStream().on('value', snapp =>{
          let users = snapp.val()
          this.setState({allUsers : users})
          console.log("user stream updated");
          onSuccess();
        }),

        new Promise((onSuccess, onFailure) => {
          MatchResultService.getGameMembersStream(gameId).on('value', snapp =>{
            let members = snapp.val()
            this.setState({gameMembers : members})
            console.log("memberstream updated");
            onSuccess();
          })
        })
      })
    ]).then(value => {
      console.log('updateGameBasInfo: all firebase done');
    })
  }  //updateGameBasInfo

  render(){
    let games = this.props.games
    let gamesInEventArray = [];
    for(let game in games){ // renderar lista med alla games
        gamesInEventArray.push(
          <li key={game}>
            Nb: { games[game].id } <br />
            Date: { games[game].date }
            <button onClick= { () => this.showInfo(game) }>Show Game Info</button>
          </li>
        )
    }


    let gameBoard = "No game selected"
    /*if(this.state.selectedGame!== ""){
      gameBoard = <GameBoard selectedGame={ this.state.selectedGame }/>
    }
    */
    return(
      <div className="ruta">
        Games in Event
        <ul>
        { gamesInEventArray.length > 0 ? gamesInEventArray : <li>"No games"</li> }
        </ul>
        {this.state.selectedGame !== "" ?
          <GameBoard
            selectedGame={ this.state.selectedGame }
            allUsers={this.state.allUsers}
            gameMembers={this.state.gameMembers}
            gameLogg={this.state.gameLogg}
          />
          :
           ""}
      </div>

    )
  }
}
