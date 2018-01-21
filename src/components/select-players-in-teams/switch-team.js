import React from "react";
import "../counter/counter.css";
import List from "semantic-ui-react/dist/es/elements/List/List";
import Button from "semantic-ui-react/dist/es/elements/Button/Button";

export const SwitchTeam = (props) => {
    return (
        <div>
            <div className="teams">
                <List divided verticalAlign='middle'>
                    <List.Item>
                        <List.Content >
                    <span className="nameStyle">
                      {props.player.name}
                    </span>

                            <Button.Group size='small'>
                                <Button active={props.player.playsForTeam === 1} className="btn-score"
                                        onClick={(event) => props.changeTeam({
                                            player: props.player,
                                            playsForTeam: {playsForTeam: 1, id: "playsForTeam"}
                                        })}>Home
                                </Button>
                                <Button active={props.player.playsForTeam === 0}
                                        onClick={(event) => props.removePlayerFromTeam({name: props.player.name})}>Not
                                    Participating</Button>
                                <Button active={props.player.playsForTeam === 2} onClick={(event) => props.changeTeam({
                                    player: props.player,
                                    playsForTeam: {playsForTeam: 2, id: "playsForTeam"}
                                })}>Away</Button>
                            </Button.Group>

                        </List.Content>
                    </List.Item>
                </List>
            </div>

        </div>
    )
};
