import React from 'react'
import Grid from "semantic-ui-react/dist/es/collections/Grid/Grid";
import Table from "semantic-ui-react/dist/es/collections/Table/Table";
import Button from "semantic-ui-react/dist/es/elements/Button/Button";
import Icon from "semantic-ui-react/dist/es/elements/Icon/Icon";

export const Gameplay = (props) => {
    return (
        <div>
            <Grid centered>
                <Grid.Column mobile={16} tablet={8} computer={4}>
                    1 - 0 should be be sticky
                </Grid.Column>
            </Grid>
            <Grid stackable columns={2}>
                <Grid.Column>
                    <Table unstackable collapsing>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell >Name</Table.HeaderCell>
                                <Table.HeaderCell >Score</Table.HeaderCell>

                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>Johan</Table.Cell>
                                <Table.Cell> <Button.Group>
                                    <Button><Icon name='minus'/></Button>
                                    <Button.Or text="1"/>
                                    <Button><Icon name='plus'/></Button>
                                </Button.Group></Table.Cell>

                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Peter</Table.Cell>
                                <Table.Cell> <Button.Group>
                                    <Button><Icon name='minus'/></Button>
                                    <Button.Or text="0"/>
                                    <Button><Icon name='plus'/></Button>
                                </Button.Group></Table.Cell>

                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Carl</Table.Cell>
                                <Table.Cell> <Button.Group>
                                    <Button><Icon name='minus'/></Button>
                                    <Button.Or text="0"/>
                                    <Button><Icon name='plus'/></Button>
                                </Button.Group></Table.Cell>

                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Magnus</Table.Cell>
                                <Table.Cell> <Button.Group>
                                    <Button><Icon name='minus'/></Button>
                                    <Button.Or text="0"/>
                                    <Button><Icon name='plus'/></Button>
                                </Button.Group></Table.Cell>

                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Grid.Column>
                <Grid.Column>
                    <Table unstackable collapsing>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell >Name</Table.HeaderCell>
                                <Table.HeaderCell >Score</Table.HeaderCell>

                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>Johan</Table.Cell>
                                <Table.Cell> <Button.Group>
                                    <Button><Icon name='minus'/></Button>
                                    <Button.Or text="1"/>
                                    <Button><Icon name='plus'/></Button>
                                </Button.Group></Table.Cell>

                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Peter</Table.Cell>
                                <Table.Cell> <Button.Group>
                                    <Button><Icon name='minus'/></Button>
                                    <Button.Or text="0"/>
                                    <Button><Icon name='plus'/></Button>
                                </Button.Group></Table.Cell>

                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Carl</Table.Cell>
                                <Table.Cell> <Button.Group>
                                    <Button><Icon name='minus'/></Button>
                                    <Button.Or text="0"/>
                                    <Button><Icon name='plus'/></Button>
                                </Button.Group></Table.Cell>

                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Magnus</Table.Cell>
                                <Table.Cell> <Button.Group>
                                    <Button><Icon name='minus'/></Button>
                                    <Button.Or text="0"/>
                                    <Button><Icon name='plus'/></Button>
                                </Button.Group></Table.Cell>

                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Grid.Column>
            </Grid>
        </div>
    )
}