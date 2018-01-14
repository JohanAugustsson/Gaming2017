import "semantic-ui-css/semantic.min.css";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import registerServiceWorker from "./registerServiceWorker";
import {MatchResultService} from "./services/match-results-service";
import {StatsTable} from "./components/stats-table/stats-table";
import {ScoreBoard} from "./components/scoreboard/scoreboard";
import Button from "semantic-ui-react/dist/es/elements/Button/Button";
import Table from "semantic-ui-react/dist/es/collections/Table/Table";
import {StepGameplay} from "./components/step-gameplay/step-gameplay";
import Segment from "semantic-ui-react/dist/es/elements/Segment/Segment";
import {GPC} from "./lib/gameplay-constants";
import Icon from "semantic-ui-react/dist/es/elements/Icon/Icon";
import Grid from "semantic-ui-react/dist/es/collections/Grid/Grid";

let playerList = require('./mocks/player-list.json');


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matchResults: [],
            players: {},
            currentStep: GPC.STEP_GAMEPLAY.TEAM_UP
        };
        this.saveMatchResults = this.saveMatchResults.bind(this);
        this.addPlayerForMatch = this.addPlayerForMatch.bind(this);
        this.resetPlayerForMatch = this.resetPlayerForMatch.bind(this);
        this.getPlayerHistory = this.getPlayerHistory.bind(this);
        this.onChangeStep2 = this.onChangeStep2.bind(this);

    }


    componentDidMount() {
        MatchResultService.getMatchResults().then(response => {
            this.setState({
                matchResults: response,
            });
        });
    }

    onChangeStep2(value, event) {
        this.setState({
            currentStep: value
        })
    }


    saveMatchResults(playersList, serie) {

        MatchResultService.setMatchResults(playersList, serie);

    }

    resetPlayerForMatch() {
        this.setState({
            players: {}
        })
    }

    addPlayerForMatch(name, isHomeTeam) {
        let playerObj = this.state.players;
        var player = {
            name: name,
            team: "the one",
            isHomeTeam: isHomeTeam,
            game: "Innebandy",
            serie: "innebandy2018"
        }

        let pl = new PlayerForMatch(player);
        playerObj[player.name] = pl[player.name];
        this.setState({
            players: playerObj
        })
    }

    getPlayerHistory() {
        MatchResultService.getMatchResults().then(response => {
            console.log(response)


        });
    }

    render() {
        return (
            <div>

                <StepGameplay currentStep={this.state.currentStep} onChange={this.onChangeStep2}/>
                <Segment attached>

                    {this.state.currentStep === GPC.STEP_GAMEPLAY.TEAM_UP ?
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
                                <Table.Row>
                                    <Table.Cell>Peter</Table.Cell>
                                    <Table.Cell> <Button.Group>
                                        <Button>Home</Button>
                                        <Button.Or />
                                        <Button>Away</Button>
                                    </Button.Group></Table.Cell>

                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Carl</Table.Cell>
                                    <Table.Cell> <Button.Group>
                                        <Button>Home</Button>
                                        <Button.Or />
                                        <Button>Away</Button>
                                    </Button.Group></Table.Cell>

                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Magnus</Table.Cell>
                                    <Table.Cell> <Button.Group>
                                        <Button>Home</Button>
                                        <Button.Or />
                                        <Button>Away</Button>
                                    </Button.Group></Table.Cell>

                                </Table.Row>
                            </Table.Body>
                        </Table>
                        :
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
                    }
                </Segment>
                <StatsTable matchResult={this.state.matchResults} players={playerList} add={this.addPlayerForMatch}/>


                <ScoreBoard
                    players={this.state.players}
                    saveMatch={this.saveMatchResults}
                    resetMatch={this.resetPlayerForMatch}
                    serie="innebandy2018"
                />
                <button onClick={this.getPlayerHistory}>Test</button>

            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();


class PlayerForMatch {
    constructor(player) {
        this[player.name] = {
            assist: 0,
            isHomeTeam: player.isHomeTeam,
            name: player.name,
            penalty: 0,
            penaltyShootOutScore: 0,
            penaltyShot: 0,
            penaltyShotScore: 0,
            score: 0,
        }
    }
}
