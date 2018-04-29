import React from 'react';
import { MatchResultService } from "../../services/match-results-service";



export class CreateEvent extends React.Component{
  constructor(props){
    super(props)
    this.state={
      nameOfEvent: "",
      typeOfEvent: ""
    }
  }

  addEvent=()=>{
    let newEvent = {
      name: this.state.nameOfEvent,
      type: this.state.typeOfEvent
    }
    MatchResultService.createNewEvent(newEvent);
  }

  updateName = (event) =>{
    this.setState({nameOfEvent: event.target.value})
  }

  updateType = (event) =>{
    this.setState({ typeOfEvent: event.target.value})
  }


  render(){
    return(
      <div>
        <div>{ this.state.nameOfEvent }</div>
        <div>{ this.state.typeOfEvent }</div>
        <label>
          SerieNamn
          <input value={ this.state.nameOfEvent } onChange={ this.updateName } type="text" />
        </label>
        <label>
          Typ
          <input value={ this.state.typeOfEvent } onChange= { this.updateType} type="text"/>
        </label>
        <button onClick={ this.addEvent }>Add event</button>
      </div>

    )
  }

}
