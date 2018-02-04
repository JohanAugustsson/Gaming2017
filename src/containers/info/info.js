import React , { Component } from 'react';
import { CreatePlayer, PlayerList } from '../../components/';
import {MatchResultService} from '../../services/match-results-service.js';
import { Player } from '../../modules/player.js';

export class Info extends Component {
  constructor(props){
    super(props);
    this.state = {
      playerList : ''
    }
    this.addPlayer = this.addPlayer.bind(this);
    this.removePlayer = this.removePlayer.bind(this);
  }
  componentWillMount(){

    MatchResultService.getPlayerList().then(response => {
        this.setState({
            playerList: response,
        });
    });
  }

  addPlayer(name){

    let id = Date.now();
    let newPlayer = new Player(name,id);
    MatchResultService.createPlayer(newPlayer);

    MatchResultService.getPlayerList().then(response => {
        this.setState({
            playerList: response,
        });
    });
  }

  removePlayer(event){
    //console.log(event.target,name);
    let name= (event.target.name);
    MatchResultService.removePlayer(name);
    
    MatchResultService.getPlayerList().then(response => {
        this.setState({
            playerList: response,
        });
    });
  }

  render(){

    return(
      <div>
        <CreatePlayer addPlayer={this.addPlayer}/>
        {this.state.playerList!=="" ? <PlayerList players={this.state.playerList} removePlayer={this.removePlayer}/>:""}
      </div>

    )
  }

}
