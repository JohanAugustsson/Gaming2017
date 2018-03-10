import React from "react";
import './player-list.css'

export const PlayerList = (props) => {

    if (props.players) {
        return (
            <div>
              All Players
              <ul className="listOfPlayers">
                  {Object.keys(props.players).map(selected =>
                    <li key={props.players[selected].id}>
                      {props.players[selected].name}
                      <button name={props.players[selected].name} onClick={props.removePlayer}>x</button>
                    </li>
                  )}
              </ul>

            </div>
        )
    }else{
      return <div>No players</div>
    }

};
