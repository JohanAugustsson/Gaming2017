import React, {Component} from 'react';


export class CreatePlayer extends Component{
  state = {
    playerName : ''
  }

  currentPlayer = (event) =>{
    let name = this.state.playerName;
    this.props.addPlayer(name)
    this.setState({
      playerName: ''
    })
  }

  handleChange = (event) => {
    this.setState({
      playerName: event.target.value
    })
  }

  render(){

    return(
      <div>
          <input
              value={this.state.playerName}
              onChange={this.handleChange}
              placeholder='Player Name'
          />
          <button onClick={this.currentPlayer}> Create Player</button>

      </div>


    )
  }

}
