import React from 'react';
import { MatchResultService } from "../../services/match-results-service";



export class GameBoard extends React.Component {
  constructor(props){ // körs endast första gången som komponenten blir skapad.
    super(props);
    this.state = {
      selectedGameId: props.selectedGame.id
    }
  }


  getLogg = ()=>{  // Skapar en lista med alla loggar
    let allUsers = this.props.allUsers;

    let newList = this.props.gameLogg.map( logg =>{
      let name = allUsers[logg.userid].name;
      return(
        <li key={ logg.id }>
          <p>Team: { logg.team } : { logg.type } by { name }</p>
        </li>
      )
    })
    return (<ul>{newList}</ul>) // Retunerar en lista
  }

  getMembers=()=>{
    let allUsers = this.props.allUsers;
    let gameMember = this.props.gameMembers;
    let newListOfMembers = [];

    for(let memb in gameMember){
      let member = {
        name: allUsers[memb].name,
        team: gameMember[memb]
      }

      newListOfMembers.push(
        <li key={ memb }>
          Name: { member.name }<br/>
          team: { member.team }
        </li>
      )
    }

    return  (<ul>{newListOfMembers}</ul>)
  }


  render(){
    let gameLogg = this.props.gameLogg;
    let gameMembers = this.props.GameMembers;
    let allUsers = this.props.allUsers;

    let loggList = "Loading!!"
    let memberList = "Loading!!"


    if( gameLogg && gameMembers!== null && allUsers!== null ){
      console.log("nu körs renderingen i gameboard!!!");
      loggList = this.getLogg();
      memberList = this.getMembers();
    }

    console.log("Props är: " , this.props);
    return(
      <div className="ruta">
        { this.props.selectedGameId} <br/>

        LoggList:
        { loggList }
        GameMembers:
        { memberList }
      </div>
    )

  }
}
