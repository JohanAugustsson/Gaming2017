import React from "react";
import PropTypes from 'prop-types';
import "semantic-ui-css/semantic.min.css";
import "../../index.css";

import {StatsTable,StatsPlayerScore} from '../../components/'
import {MatchResultService} from "../../services/match-results-service";


let allUsers = {};
let allGames = {};
let allGamesLogg = {};
let allGameMembers = {};

export class Scores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            event: {},  //ny
            eventMembers: {}, //ny
            gameMembers: {}, //ny
            gameLoggs: {}, //ny
        };
          this.setScoreOfPlayers = this.setScoreOfPlayers.bind(this);
          this.getMemberInGames = this.getMemberInGames.bind(this);
    }

    static contextTypes = {
      route: PropTypes.string
    } //kommer nu åt vald sida med hjälp av this.context.route

    componentDidMount() {

        //--- nytt nedanför- 2018-03-18  ---------------------------------------

        MatchResultService.getUsers().then(response=>{  // Hämtar alla användare
          allUsers=response;
        });
        MatchResultService.getGameLoggs().then(response=>{ // Hämtar alla loggar
          allGamesLogg = response;
        });

        MatchResultService.getSelectedEvent("-L7nSR3BtV-9Tc6soPJx").then(response=>{ // Hämtar data för event
          let selectedEvent = response;
          this.setState({
            event : selectedEvent
          })
          return selectedEvent
        }).then((selectedEvent)=>{


          MatchResultService.getSelectedEventMembers(selectedEvent.id).then(response=>{ // Hämtar Event medlemar
            let members = Object.keys(response).map(member=> allUsers[member]) // Hämtar info om varje medlem
            let memberObj = {};
            members = members.map(member=> memberObj[member.id] = new Player(member));                 // lägger till classen "Player" på varje meddlem

            this.setState({
              eventMembers : memberObj
            })

          })

          MatchResultService.getGames().then(response=>{  // Hämtar alla games i eventet
            allGames= response;
            let eventId = this.state.event.id
            let games = Object.keys(allGames).filter(game=> allGames[game].event===eventId)
            this.setState({
              eventGames: games
            })
            return games

          }).then((games)=>{ // Hämtar alla loggar för respektive game
            this.getGameLoggs(games)
            return games

          }).then((games)=>{
            this.getMemberInGames(games) // Lägger till meddelmar i gameMembers
            return games
          });
      }); //---------------- ny slut
    }
    getGameLoggs(games){
      let newList = {}
      games.map(game=>{
        newList[game]= allGamesLogg[game]
        return ""
      });
      this.setState({
        gameLoggs: newList
      })

    }

    getMemberInGames(games){
      MatchResultService.getGameMembers().then(response=>{ // Lägger till meddelmar i games
         return response;
      }).then((response)=>{
        allGameMembers = response;

        let newMemberList ={};

        games.map(game=>{
          newMemberList[game] = allGameMembers[game];
          return ""; // blir en varning om man inte har med denna.
        });

        this.setState({
          gameMembers: newMemberList
        })

        this.setState({ // ladd tid över
          loading:false
        })

      });

    }

    updateScore(){
      // gå igenom alla games.. plocka ut medlem i varje game.. titta därefter på loggOfGame
      // och uppdatera respektive spelare med värdena utifrån den.

      let games = this.state.eventGames;
      let gameLoggs = this.state.gameLoggs;
      let eventMembers = this.state.eventMembers;
      let gameMembers = this.state.gameMembers;

      games.map(game=>{
        let selectGame = {}
        selectGame.game = game;
        selectGame.member = gameMembers[game];
        selectGame.logg = gameLoggs[game];

        for(let item in (selectGame.logg)){
          let update = selectGame.logg[item];
          if(update.type=="goal"){
            console.log("add goal", update.userid);
            eventMembers[update.userid].goal=+1;

          }
        }

        console.log(selectGame);
        console.log(eventMembers);

      })


    }



    setScoreOfPlayers(scoreOfPlayer) {

        MatchResultService.getPlayerList().then(response => {  // Nollställer playerList
            this.setState({
                playerList: response
            });
        });
        MatchResultService.getMatchResults("nhl", "nhl2018").then(response => { //köras för att hämta uppdaterad match o visas i StatsTable
            this.setState({
                matchResults: response
            });
        });


        this.setState({
            scoreOfPlayer: scoreOfPlayer
        })
    }




    render() {


        if (this.state.loading) {
            return (<div>loading</div>)
        } else {

          this.updateScore();

            return (
              <div>
                <StatsTable
                   //players={this.state.scoreOfPlayer} />
                   players={this.state.eventMembers} />

               <StatsPlayerScore
                   games={this.state.eventGames}
                   members={this.state.eventMembers}
                   setScore={this.setScoreOfPlayers} />
              </div>
            );
        }
    }
}



class Player{
  constructor(member){
    this.assist = 0;
    this.goalAgainst = 0;
    this.goalAway = 0;
    this.goalFor = 0;
    this.goalHome = 0;
    this.goalTotal = 0;
    this.id= member.id;
    this.matchesAway = 0;
    this.matchesHome = 0;
    this.matchesPlayed = 0;
    this.matchesDraw = 0;
    this.matchesWins = 0;
    this.name= member.name;
    this.age = member.age;
    this.place = member.place;
    this.date = member.date;
  }
}
