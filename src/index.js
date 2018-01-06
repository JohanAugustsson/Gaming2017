import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import {ResultBoard} from './history.js'
import {ScoreBoard} from './scoreboard.js'

let playerList = [
  {
    id: 1,
    name:"Johan",
    matches: 0,
    matchesHome:0,
    matchesAway:0,
    wins: 0,
    gt: 0,
    gh: 0,
    ga: 0,
    goalFor: 0,
    goalAgainst: 0

  },
  {
    id: 2,
    name:"Carl",
    matches: 0,
    matchesHome:0,
    matchesAway:0,
    wins: 0,
    gt: 0,
    gh: 0,
    ga: 0,
    goalFor: 0,
    goalAgainst: 0

  },
  {
    id: 3,
    name:"Peter",
    matches: 0,
    matchesHome:0,
    matchesAway:0,
    wins: 0,
    gt: 0,
    gh: 0,
    ga: 0,
    goalFor: 0,
    goalAgainst: 0

  },
  {
    id: 4,
    name:"Niklas",
    matches: 0,
    matchesHome:0,
    matchesAway:0,
    wins: 0,
    gt: 0,
    gh: 0,
    ga: 0,
    goalFor: 0,
    goalAgainst: 0

  },
  {
    id: 5,
    name: "Magnus",
    matches: 0,
    matchesHome:0,
    matchesAway:0,
    wins: 0,
    gt: 0,
    gh: 0,
    ga: 0,
    goalFor: 0,
    goalAgainst: 0

  },
  {
    id: 6,
    name:"Wille",
    matches: 0,
    matchesHome:0,
    matchesAway:0,
    wins: 0,
    gt: 0,
    gh: 0,
    ga: 0,
    goalFor: 0,
    goalAgainst: 0
  },
  {
    id: 7,
    name:"Niklas",
    matches: 0,
    matchesHome:0,
    matchesAway:0,
    wins: 0,
    gt: 0,
    gh: 0,
    ga: 0,
    goalFor: 0,
    goalAgainst: 0
  },
  {
    id: 8,
    name:"Martin",
    matches: 0,
    matchesHome:0,
    matchesAway:0,
    wins: 0,
    gt: 0,
    gh: 0,
    ga: 0,
    goalFor: 0,
    goalAgainst: 0
  }
];


class App extends React.Component{
  constructor(props){
    super(props)


  }

  render(){

    return(
      <div>
        <ResultBoard players={playerList} />
        <ScoreBoard />


      </div>
    );

  }


}


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
