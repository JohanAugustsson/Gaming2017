import React from "react";
import Icon from "semantic-ui-react/dist/es/elements/Icon/Icon";
import Table from "semantic-ui-react/dist/es/collections/Table/Table";

export const MatchList = (props) => {

    if (props.matches) {
        return (
            <div>
                <Table celled inverted selectable size="large" >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell>Played Date</Table.HeaderCell>
                            <Table.HeaderCell>Match ID</Table.HeaderCell>

                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {Object.keys(props.matches).map(key =>

                            <Table.Row key={key} onClick={(event => props.onChangeMatch({
                                typ: props.matches[key].typ,
                                serie: props.matches[key].serie,
                                key: key,
                            }))}>
                                <Table.Cell> <Icon name="target"/></Table.Cell>

                                <Table.Cell>{(new Date()).toISOString().slice(0, 10).replace(/-/g, "")}</Table.Cell>
                                <Table.Cell>{key}</Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>

            </ div >
        )
    }
};
