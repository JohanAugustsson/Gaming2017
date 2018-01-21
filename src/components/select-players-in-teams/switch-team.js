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

                                <Button active={props.player.isHomeTeam === true}
                                        className="btn-score"
                                        onClick={(event) => props.changeTeam({
                                            player: props.player,
                                            isHomeTeam: {isHomeTeam: true, id: "isHomeTeam"}
                                        })}>Home
                                </Button>

                                <Button active={props.player.isHomeTeam === null}
                                        onClick={(event) => props.removePlayerFromTeam({
                                            name: props.player.name
                                        })}>Not Participating
                                </Button>

                                <Button active={props.player.isHomeTeam === false}
                                        onClick={(event) => props.changeTeam({
                                            player: props.player,
                                            isHomeTeam: {isHomeTeam: false, id: "isHomeTeam"}
                                        })}>Away
                                </Button>

                            </Button.Group>
                        </List.Content>
                    </List.Item>
                </List>
            </div>
        </div>
    )
};
