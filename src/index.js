import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import {StatsTable} from './components/stats-table/stats-table.js'
import {ScoreBoard} from './components/scoreboard/scoreboard.js'

import {MatchResultService} from "./services/match-results-service";

let playerList = require('./mocks/player-list.json');
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matchResults: []
        };
    }

    componentDidMount() {
        MatchResultService.getMatchResults().then(response => {
            this.setState({
                matchResults: response
            });
        });
    }

    render() {

        return (
            <div>
                <StatsTable players={playerList}/>
                <ScoreBoard />
            </div>
        );

    }


}


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
