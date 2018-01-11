import React from "react";
import PropTypes from "prop-types";
import "./stats-table.css";
export class StatsTable extends React.Component{
    constructor(props){
      super(props)

      this.handleClickHome = this.handleClickHome.bind(this);
      this.handleClickAway = this.handleClickAway.bind(this);
    }
  handleClickHome(e){
    let name = e.target.name;
    this.props.add(name,true);
    let bgColor = e.target.style.backgroundColor !== "chartreuse" ? "chartreuse" : "darkslategray";
     e.target.style.backgroundColor = bgColor;
  }
  handleClickAway(e){
    let name = e.target.name;
    this.props.add(name,false);
    let bgColor = e.target.style.backgroundColor !== "red" ? "red" : "grey";
     e.target.style.backgroundColor = bgColor;
  }

  render(){
      let x = Object.keys(this.props.players)
      let players = this.props.players;

      //let playersAll = this.props.players.map(player=>{
      let playersAll = x.map(player=>{
      return(
        <tr key={players[player].id}>
          <td className="playerName historyTable">
            {players[player].name}
          </td>
          <td className="playerMatch historyTable">
            {players[player].matches}
          </td>
          <td className="playerMatch historyTable">
            {players[player].matchesHome}
          </td>
          <td className="playerMatch historyTable">
            {players[player].matchesAway}
          </td>
          <td className="playerWins historyTable">
            {players[player].wins}
          </td>
          <td className="historyTable">
            {(players[player].matches > 0 ?  players[player].wins / players[player].matches : "0")*100 +"%"}
          </td>
          <td className="playerGt historyTable">
            {players[player].gt}
          </td>
          <td className="playerGh historyTable">
            {players[player].gh}
          </td>
          <td className="playerGa historyTable">
            {players[player].ga}
          </td>
          <td className="playerGoalsFor historyTable">
            {players[player].goalFor}
          </td>
          <td className="playerGoalsAgainst historyTable">
            {players[player].goalAgainst}
          </td>
          <td className="historyTable">
            {players[player].goalFor - players[player].goalAgainst}
          </td>


          <td className="historyTable">
            <button id="btnHome" name={players[player].name} onClick={this.handleClickHome}>Play Home</button>

          </td>
          <td className="historyTable">

            <button id="btnAway" name={players[player].name} onClick={this.handleClickAway}>Play Away</button>
          </td>
        </tr>

        )
      });
    return(
      <div>

        <table className="tbody">
          <caption>Standings</caption>
          <thead>
            <tr>
              <th className="historyTable">Name</th>
              <th className="historyTable">Match</th>
              <th className="historyTable">Home</th>
              <th className="historyTable">Away</th>
              <th className="historyTable">Wins</th>
              <th className="historyTable">WR</th>
              <th className="historyTable">GT</th>
              <th className="historyTable">GH</th>
              <th className="historyTable">GA</th>
              <th className="historyTable">GF</th>
              <th className="historyTable">GA</th>
              <th className="historyTable">GD+-</th>
              <th className="historyTable"></th>
            </tr>
          </thead>
          <tbody>
            {playersAll}

          </tbody>
        </table>
      </div>
    )
  }
}
/*
StatsTable.propTypes={
  players: PropTypes.obj.isRequired

};
*/
