import React from "react";
import "./scoreboard.css";
import {Counter} from "../counter/counter";
import {Menu} from "semantic-ui-react";


export class ScoreBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            players: {},
            serie: "innebandy2018",
            activeItem: 'Home'
        };
        this.goal = this.goal.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleClickHome = this.handleClickHome.bind(this);
    }


    handleSave(list){
      //let lista = this.state.serie;
      let matchId = Object.keys(this.props.match)[0];
      let serie = this.props.match[matchId].serie;
      let typ = this.props.match[matchId].typ;
      this.props.saveMatch(list,serie,matchId,typ);

    }

    goal(changedScore, player) {
        let matchId = Object.keys(this.props.match)[0];
        let list = this.props.match[matchId].players;
        list[player.name].goalTotal +=changedScore;
        this.setState({
            players: list
        });
        this.handleSave(list);  // SPARAR DATA TILL DATABAS
    }



    handleClickHome(event, {name}){
      this.setState({
        activeItem: name
      })
    }



    render() {
        let homeTeam ="";
        let awayTeam ="";
        let goalHome=0;
        let goalAway=0;
        let matchId = Object.keys(this.props.match)[0];

        if(this.props.match[matchId] && this.props.match[matchId].players ){
          let matchId = Object.keys(this.props.match)[0];
          let names = Object.keys(this.props.match[matchId].players);
          let obj = this.props.match[matchId].players;
          let listPlay = names.map(x=> {
            return obj[x];
          });

          homeTeam = listPlay.filter(x=>x.isHomeTeam === true);
          awayTeam = listPlay.filter(x=>x.isHomeTeam === false);
          homeTeam = homeTeam.map( (name,index) =>{
            goalHome+=name.goalTotal;
            return <Counter key={index} id={index} goal={this.goal} player={name} />;
          });
          awayTeam = awayTeam.map( (name,index) =>{
            goalAway+=name.goalTotal;
            return <Counter key={index} id={index} goal={this.goal} player={name} />;
          })
        }
        let whichTeam = "";
        if(this.state.activeItem==="Home"){
          whichTeam = homeTeam;
        }else{
          whichTeam = awayTeam;
        }

        return (
          <div id="scoreboard">
            <div>
              MatchId: {matchId}
            </div>
            <div className="score">
                {goalHome} - {goalAway}
            </div>
            <div>
              <Menu pointing>
              <Menu.Item name='Home' active={this.state.activeItem==="Home"} onClick={this.handleClickHome} />
              <Menu.Item name='Away' active={this.state.activeItem === 'Away'} onClick={this.handleClickHome} />

            </Menu>
            </div>
              {whichTeam}






          </div>
        );
    }

}
