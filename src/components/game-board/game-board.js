import React from 'react';
import { MatchResultService } from "../../services/match-results-service";



export class GameBoard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      gameLogg : [],
      gameMembers : "",
      allUsers : "",
      loading: 3
    }
  }

  componentDidMount(){
    let gameId = this.props.selectedGame.id

    MatchResultService.getGameLoggStream(gameId).on('child_added', snapp =>{
      let logg = snapp.val()
      let gameLogg = this.state.gameLogg;
      gameLogg.push(logg)
      this.setState({gameLogg : gameLogg})
      this.loadingFinished();
    })

    MatchResultService.getUsersStream().on('value', snapp =>{
      let users = snapp.val()
      this.setState({allUsers : users})
      this.loadingFinished();
    })

    MatchResultService.getGameMembersStream(gameId).on('value', snapp =>{
      let members = snapp.val()
      this.setState({gameMembers : members})
      this.loadingFinished();
    })


  } // C.didMount End


  loadingFinished =()=>{
    console.log("ladd en till");
    this.setState({
      loading: this.state.loading - 1
    })

  }

  getLogg = ()=>{  // Skapar en lista med alla loggar
    let allUsers = this.state.allUsers;
    console.log(allUsers);
    let newList = this.state.gameLogg.map( logg =>{
      console.log(allUsers[logg.userid]);
      return(
        <li key={ logg.id }>
          <p>Team: { logg.team } : { logg.type } by { logg.userid}</p>
        </li>
      )
    })
    return (<ul>{newList}</ul>) // Retunerar en lista
  }

  getMembers=()=>{
    let allUsers = this.state.allUsers;
    let gameMember = this.state.gameMembers;
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
    let loggList = "Loading!!"
    let memberList = "Loading!!"
    if(this.state.loading == 0){
      console.log("inne i if");
      loggList = this.getLogg();
      memberList = this.getMembers();
    }
      return(
        <div>
          GameBoard!!
          { loggList }
          { memberList }

        </div>
      )

  }
}
