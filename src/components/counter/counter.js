import React from "react";
import PropTypes from "prop-types";
import { List, Image, Button } from 'semantic-ui-react';
import './counter.css'

export class Counter extends React.Component {
    constructor(props) {
        super(props);

        this.incrementScore = this.incrementScore.bind(this);
        this.decrementScore = this.decrementScore.bind(this);
    }

    incrementScore(event) {

        let playerId = this.props.player;
        this.props.goal(1, playerId);

    }

    decrementScore(event) {
      if(this.props.player.goalTotal>0){
        let player = this.props.player;
        this.props.goal(-1, player);

      }

    }

    render() {
        return (
          <div>
            <div className="teams">



            <List divided verticalAlign='middle'>
                <List.Item>
                  <List.Content >
                    <span className="nameStyle">
                      {this.props.player.name}
                    </span>

                      <Button.Group size='small' >
                        <Button className="btn-score" onClick={this.decrementScore}>-</Button>
                        <Button>{this.props.player.goalTotal}</Button>
                        <Button onClick={this.incrementScore}>+</Button>
                      </Button.Group>
                  </List.Content>
                </List.Item>
            </List>
          </div>

          </div>
        );
    }
}




/* skall vara under List.Item om man vil ha bild
<Image avatar src='/assets/images/avatar/small/daniel.jpg' />
*/


/*
<div className="player">
    <span className="playerName">{this.props.player.name}</span>
    <button className="danger" onClick={this.decrementScore}>-</button>
    <span>{this.props.player.goalTotal}</span>
    <button className="primary" onClick={this.incrementScore}>+</button>
</div>
*/
