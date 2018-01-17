import React from "react";
import "../counter/counter.css";
import List from "semantic-ui-react/dist/es/elements/List/List";
import Button from "semantic-ui-react/dist/es/elements/Button/Button";

export const SwitchTeam= (props) => {
    return (
        <div>
            <div className="teams">
                <List divided verticalAlign='middle'>
                    <List.Item>
                        <List.Content >
                    <span className="nameStyle">
                      {props.player.name}
                    </span>

                            <Button.Group size='small' >
                                <Button className="btn-score" onClick={(event) => props.changeTeam({name: props.player.name,playsForTeam:1},event)}>Home</Button>
                                <Button onClick={(event) => props.changeTeam({name: props.player.name,playsForTeam:0},event)}>Not Participating</Button>
                                <Button onClick={(event) => props.changeTeam({name: props.player.name,playsForTeam:2},event)}>Away</Button>
                            </Button.Group>

                        </List.Content>
                    </List.Item>
                </List>
            </div>

        </div>
    )
}