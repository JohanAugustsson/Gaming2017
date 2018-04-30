import React from 'react';
import { MatchResultService } from "../../services/match-results-service";
import { CreateEvent, GameList } from "../../components/";

export class Games extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      events: [],
      games: "",
      gamesInEvent: [],
      loading: true
    }
  }
  componentDidMount(){

    MatchResultService.getEventsStream().on('child_added', snapshot =>{  //Lägger Alla events
      let eventsArray = this.state.events;
      let newEvent = snapshot.val();
      eventsArray.push(newEvent)

      this.setState({
        events : eventsArray
      })
    })

    MatchResultService.getGames().then( response =>{  // Hämtar alla Games
      this.setState({games: response, loading: false })
    })
  }

  testMe = (myEvent) => {
    console.log("hej");
    let games = this.state.games;
    let eventId = this.state.events[myEvent].id

    let listOfGamesInEvent = []
    for(let game in games){
      if(games[game].event === eventId){
        listOfGamesInEvent.push(games[game])
      }
    }

    this.setState({
      gamesInEvent : listOfGamesInEvent
    })

  }

  render(){
    let evenstArray = [];
    let allEvents = this.state.events
    if(!this.state.loading){    // visar alla events
      for(let myEvent in allEvents){
        evenstArray.push(<li key={myEvent}> { allEvents[myEvent].id } <button onClick= { ()=> this.testMe(myEvent) }>Show Games in Event</button></li>)
      }
    }

    return(
      <div className="ruta">
        <CreateEvent />
        <ul>
          { evenstArray }
        </ul>

        <GameList games= { this.state.gamesInEvent } />
      </div>
    )
  }

}
