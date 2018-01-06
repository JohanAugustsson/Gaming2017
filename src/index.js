import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import {StatsTable} from './components/stats-table/stats-table.js'
import {ScoreBoard} from './components/scoreboard/scoreboard.js'

let playerList = require('./mocks/player-list.json');

class App extends React.Component{
  constructor(props){
    super(props)


  }

  render(){

    return(
      <div>
        <StatsTable players={playerList} />
        <ScoreBoard />


      </div>
    );

  }


}


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
