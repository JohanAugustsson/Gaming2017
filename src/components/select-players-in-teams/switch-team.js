import React from "react";
import Button from "semantic-ui-react/dist/es/elements/Button/Button";
import Grid from "semantic-ui-react/dist/es/collections/Grid/Grid";

export const SwitchTeam = (props) => {
    return (
        <div>
            <Grid id="griden">
                <Grid.Row centered>
                    <Grid.Column  mobile="1" table="7" computer="5">

                    </Grid.Column>
                    <Grid.Column mobile="16" table="7" computer="2">
                        {props.player.name}
                    </Grid.Column>

                        <Grid.Column mobile="9" table="9" computer="9">
                        <Button.Group size='small'>

                            <Button inverted active={props.player.isHomeTeam === true}
                                    onClick={(event) => props.changeTeam({
                                        player: props.player,
                                        isHomeTeam: {isHomeTeam: true, id: "isHomeTeam"}
                                    })}>Home
                            </Button>

                            <Button inverted
                                    active={props.player.isHomeTeam !== true && props.player.isHomeTeam !== false}
                                    onClick={(event) => props.removePlayerFromTeam({
                                        name: props.player.name
                                    })}>Benched
                            </Button>

                            <Button inverted active={props.player.isHomeTeam === false}
                                    onClick={(event) => props.changeTeam({
                                        player: props.player,
                                        isHomeTeam: {isHomeTeam: false, id: "isHomeTeam"}
                                    })}>Away
                            </Button>

                        </Button.Group>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
};
