import React, {Component} from 'react';
import {MatchResultService} from '../../services/match-results-service.js';
import "semantic-ui-css/semantic.min.css";
import { Button, Form, Segment } from 'semantic-ui-react'

export class CreatePlayer extends Component{


  currentPlayer() {
    MatchResultService.getPlayerList().then(response=>{
      console.log(response);
    });
  }

  render(){

    return(
      <Segment>
        <Form >
          <Form.Group widths='equal'>
            <Form.Input fluid label='Player Name' placeholder='Player Name' />
          </Form.Group>
          <Button onClick={this.currentPlayer}>Create Player</Button>
        </Form>
      </Segment>


    )
  }

}
