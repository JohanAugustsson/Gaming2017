import React from "react";
import "./stats-table.css";

export class StatsTable extends React.Component{



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
            {players[player].matchesPlayed}
          </td>
          <td className="playerMatch historyTable">
            {players[player].matchesHome}
          </td>
          <td className="playerMatch historyTable">
            {players[player].matchesAway}
          </td>
          <td className="playerWins historyTable">
            {players[player].matchesWins}
          </td>
          <td className="playerWins historyTable">
            {players[player].matchesDraw}
          </td>
          <td className="historyTable">
            {Math.floor((players[player].matchesPlayed > 0 ?  players[player].matchesWins / players[player].matchesPlayed : "0")*100) +"%"}
          </td>
          <td className="playerGt historyTable">
            {players[player].goalTotal}
          </td>
          <td className="playerGh historyTable">
            {players[player].goalHome}
          </td>
          <td className="playerGa historyTable">
            {players[player].goalAway}
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
              <th className="historyTable">Draw</th>
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
