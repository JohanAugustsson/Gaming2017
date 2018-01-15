import React from 'react'
import Table from "semantic-ui-react/dist/es/collections/Table/Table";
import Button from "semantic-ui-react/dist/es/elements/Button/Button";
export const SelectPlayersInTeams = (props) => {

    return (
            <Table unstackable collapsing>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Team</Table.HeaderCell>

                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>Johan</Table.Cell>
                        <Table.Cell> <Button.Group>
                            <Button>Home</Button>
                            <Button.Or />
                            <Button >Away</Button>
                        </Button.Group></Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
    )
};
