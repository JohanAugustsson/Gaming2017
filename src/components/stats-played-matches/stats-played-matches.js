import React from 'react';


export class StatsPlayedMatches extends React.Component{



  render(){
    return(
      <div>

        <table class="ui selectalbe inverted table">
          <thead>
            <tr>
              <th>
                Game Nb
              </th>
              <th>
                Score
              </th>
              <th>
                HomeTeam
              </th>
              <th>
                AwayTeam
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                Game 1
              </td>
              <td>
                2 - 5
              </td>
              <td>
                Johan,Niklas
              </td>
              <td>
                Peter,Carl
              </td>
            </tr>
          </tbody>

        </table>


      </div>
    );
  }
}
