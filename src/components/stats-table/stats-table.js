import React from "react";
import "./stats-table.css";

export class StatsTable extends React.Component{



  render(){
      let x = Object.keys(this.props.players)
      let players = this.props.players;

      //sorterar listan med vinst högst upp
      let list = x.map(player=> players[player]);
      list.sort((a,b)=> b.matchesWins-a.matchesWins)




      //let playersAll = this.props.players.map(player=>{
      let playersAll = list.map(player=>{
      return(

        <tr key={player.id}>

          <td className="playerNames historyTable">
            {player.name}
          </td>
          <td className="playerMatch historyTable">
            {player.matchesPlayed}
          </td>
          <td className="playerMatch historyTable">
            {player.matchesHome}
          </td>
          <td className="playerMatch historyTable">
            {player.matchesAway}
          </td>
          <td className="playerWins historyTable">
            {player.matchesWins}
          </td>
          <td className="playerWins historyTable">
            {player.matchesDraw}
          </td>
          <td className="historyTable">
            {Math.floor((player.matchesPlayed > 0 ?  player.matchesWins / player.matchesPlayed : "0")*100) +"%"}
          </td>
          <td className="playerGt historyTable">
            {player.goalTotal}
          </td>
          <td className="playerGh historyTable">
            {player.goalHome}
          </td>
          <td className="playerGa historyTable">
            {player.goalAway}
          </td>
          <td className="playerGoalsFor historyTable">
            {player.goalFor}
          </td>
          <td className="playerGoalsAgainst historyTable">
            {player.goalAgainst}
          </td>
          <td className="historyTable">
            {player.goalFor + player.goalAgainst}
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
