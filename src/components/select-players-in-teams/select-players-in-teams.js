import React from "react";
import {SwitchTeam} from "./switch-team";
export const SelectPlayersInTeams = (props) => {

    return (
        <div>
            {Object.keys(props.players).map(player =>

                <SwitchTeam key={props.players[player].id}
                            id={props.players[player].id}
                            changeTeam={props.changeTeam}
                            removePlayerFromTeam={props.removePlayerFromTeam}
                            player={props.players[player]} />)
            }
        </div>
    )
}
