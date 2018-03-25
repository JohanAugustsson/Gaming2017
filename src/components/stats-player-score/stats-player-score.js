import React from 'react';


export class StatsPlayerScore extends React.Component{
  constructor(props){
    super(props);
    this.handelClickUpdateScore = this.handelClickUpdateScore.bind(this)
  }


  handelClickUpdateScore(){
    this.props.updateScore();
  }

    render(){

      return(
        <div>
          <button onClick={this.handelClickUpdateScore}>Update scoreTable</button>
        </div>
      );
  }

}
