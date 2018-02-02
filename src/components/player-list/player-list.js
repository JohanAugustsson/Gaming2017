import React from "react";
import Icon from "semantic-ui-react/dist/es/elements/Icon/Icon";
import Table from "semantic-ui-react/dist/es/collections/Table/Table";
import { Button } from 'semantic-ui-react'

export const PlayerList = (props) => {
  console.log(props.players)
    if (props.players) {
        return (
            <div>
                <Table celled inverted selectable >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>All Players</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {Object.keys(props.players).map(selected =>
                            <Table.Row key={props.players[selected].id}>
                                <Table.Cell> <Icon name="target"/>
                                {props.players[selected].name}
                                <Button inverted size='small' compact floated='right' color='red'>x</Button>
                                </Table.Cell>

                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>

            </div>
        )
    }else{
      return <div>No players</div>
    }

};
