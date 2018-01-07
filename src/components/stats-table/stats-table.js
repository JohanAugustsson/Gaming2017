import React from "react";
import PropTypes from "prop-types";
import "./stats-table.css";
export class StatsTable extends React.Component{
    constructor(props){
      super(props)

      this.handleClick = this.handleClick.bind(this);
    }
  handleClick(e){
    console.log(e.target.name);
  }

  render(){
      let playersAll = this.props.players.map(player=>{
      return(
        <tr key={player.id}>
          <td className="playerName historyTable">
            {player.name}
          </td>
          <td className="playerMatch historyTable">
            {player.matches}
          </td>
          <td className="playerMatch historyTable">
            {player.matchesHome}
          </td>
          <td className="playerMatch historyTable">
            {player.matchesAway}
          </td>
          <td className="playerWins historyTable">
            {player.wins}
          </td>
          <td className="historyTable">
            {player.matches>0 ? player.matches / player.wins: "0"}
          </td>
          <td className="playerGt historyTable">
            {player.gt}
          </td>
          <td className="playerGh historyTable">
            {player.gh}
          </td>
          <td className="playerGa historyTable">
            {player.ga}
          </td>
          <td className="playerGoalsFor historyTable">
            {player.goalFor}
          </td>
          <td className="playerGoalsAgainst historyTable">
            {player.goalAgainst}
          </td>
          <td className="historyTable">
            {player.goalFor - player.goalAgainst}
          </td>
          <td className="historyTable">
            <button name={player.name} onClick={this.handleClick}>Play</button>
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
              <th className="historyTable">WR%</th>
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

StatsTable.propTypes={
  players: PropTypes.array.isRequired

};
