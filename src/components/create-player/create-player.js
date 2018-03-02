import React, {Component} from 'react';
// import {MatchResultService} from '../../services/match-results-service.js';
import { Button, Form, Segment } from 'semantic-ui-react'
//import { Player } from '../../modules/player.js';


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
      <Segment>
        <Form >
          <Form.Group widths='equal'>
            <Form.Input
              value={this.state.playerName}
              onChange={this.handleChange}
              fluid label='Player Name'
              placeholder='Player Name' />

          </Form.Group>
          <Button onClick={this.currentPlayer}> Create Player</Button>
        </Form>
      </Segment>


    )
  }

}
