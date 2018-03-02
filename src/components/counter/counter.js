import React from "react";
import Grid from "semantic-ui-react/dist/es/collections/Grid/Grid";
import Button from "../atoms/button/button";

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
              <Grid id="griden">
                  <Grid.Row centered>
                      <Grid.Column  mobile="1" table="7" computer="5">

                      </Grid.Column>
                      <Grid.Column mobile="16" table="7" computer="2">
                          {this.props.player.name}
                      </Grid.Column>

                      <Grid.Column mobile="9" table="9" computer="9">

                        <Button basic secondary onClick={this.decrementScore}>-</Button>
                        <Button basic inverted>{this.props.player.goalTotal}</Button>
                        <Button basic secondary onClick={this.incrementScore}>+</Button>

                      </Grid.Column>
                  </Grid.Row>
              </Grid>

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
