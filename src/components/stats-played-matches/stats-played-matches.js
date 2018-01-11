import React from 'react';
import { Table } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';

export class StatsPlayedMatches extends React.Component{



  render(){

    return(
      <div>
        <Button primary>Primary</Button>
        <Button secondary>Secondary</Button>

      <Table celled inverted selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Notes</Table.HeaderCell>
          </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>John</Table.Cell>
          <Table.Cell>Approved</Table.Cell>
          <Table.Cell textAlign='right'>None</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Jamie</Table.Cell>
          <Table.Cell>Approved</Table.Cell>
          <Table.Cell textAlign='right'>Requires call</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Jill</Table.Cell>
          <Table.Cell>Denied</Table.Cell>
          <Table.Cell textAlign='right'>None</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>


      </div>
    );
  }
}
