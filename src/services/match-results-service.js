import firebase from "./fire";

const rootRef = firebase.database().ref();
const firebaseDb= firebase.database();

export const MatchResultService = {

    getMatchResults(typ, serie)  {
        return rootRef.child(`matchResults/${typ}/${serie}`).once('value').then(snap => {
            return snap.val();
        })
    },

    getPlayerList()  {
        return rootRef.child('players/').once('value').then(snap => {

            return snap.val();
        });
    },

    getMatchResultsStream(typ, serie)  {
        return rootRef.child(`matchResults/${typ}/${serie}`);
    },

    getMatchStream(match)  {
        return rootRef.child(`matchResults/${match.typ}/${match.serie}/${match.id}`);
    },

    //setMatchResults({serie="innebandy2018",isOvertime=false,isPenaltyShootout=false,players="0"){
    setMatchResults(typ, serie, matchId, players){
        /*let d = new Date();   sätter match id.. används ej för tillfälligt
         let n = d.getTime();*/
        return rootRef.child(`matchResults/${typ}/${serie}/${matchId}/`).set({
            typ: typ,
            serie: serie,
            players: players != null ? players : [],
            isOvertime: false,
            isPenaltyShootout: false
        });
    },

    /**
     * Tar bort spelare från en match.
     * @param typ typ av spel
     * @param serie en serie där matcher ingår
     * @param matchId matchId för matchen
     * @param name namn på spelare som ska tas bort
     * @returns {!firebase.Promise.<void>}
     */
    removePlayerFromMatch(typ, serie, matchId, name){
        return rootRef.child(`matchResults/${typ}/${serie}/${matchId}/players/${name}`).remove();
    },

    /**
     * Skapar en ny match
     * @param typ typ av spel
     * @param serie en serie där matcher ingår
     * @returns {!firebase.Promise.<void>}
     */
    createMatch(typ, serie){
        return rootRef.child(`matchResults/${typ}/${serie}/`).push({
            isOvertime: false,
            isPenaltyShootout: false,
            players: {},
            serie: serie,
            typ: typ
        });
    },

    createPlayer(player){
      return rootRef.child(`players/${player.name}/`).set(player);
    },

    removePlayer(player){
      rootRef.child('players/' + player).remove();
    },




    // ny variant 2018-03-10 --------------------------------------------------

    createNewEvent(){
      var newPostKey = rootRef.child('events').push().key;
      let obj = {
        id: newPostKey,
        type: "NHL",
        serie: "Vår2018",
        date: Date.now()
      }
      rootRef.child(`events/${newPostKey}`).set(obj);
    },

    createNewGame(){
      var newPostKey = rootRef.child('games').push().key;
      let obj = {
        id: newPostKey,
        date: Date.now(),
        event: "fyll i"
      }
      rootRef.child(`games/${newPostKey}`).set(obj);
    },

    createNewUser(){
      var newPostKey = rootRef.child('users').push().key;
      let obj = {
        id: newPostKey,
        name: "Carl",
        age: 36,
        date: Date.now(),
        place: "Jönköping"
      }
      rootRef.child(`users/${newPostKey}`).set(obj);
    },

    getUsers(){
      return rootRef.child('users/').once('value').then(snap => {
          return snap.val();
      });
    },

    getGames(){
      return rootRef.child(`games`).once('value').then(snap => {
          return snap.val();
      })
    },

    getEvents(){
      return rootRef.child(`event`).once('value').then(snap => {
          return snap.val();
      })
    },

    getSelectedEvent(eventid){
      return rootRef.child(`events/${eventid}`).once('value').then(snap=>{
        return snap.val();
      })
    },
    getSelectedEventMembers(eventid){
      return rootRef.child(`memberInEvent/${eventid}`).once('value').then(snap=>{
        return snap.val();
      })
    },

    getGameLoggs(){
      return rootRef.child(`loggOfGame/`).once('value').then(snap=>{
        return snap.val();
      })
    },
    getGameMembers(){
      return rootRef.child(`memberInGame/`).once('value').then(snap=>{
        return snap.val();
      })
    },

    addMemberInGame({gameid,userid,team}){
      rootRef.child(`memberInGame/${gameid}/${userid}`).set(team)
    },
    addMemberInEvent({eventid,userid}){
      rootRef.child(`memberInEvent/${eventid}/${userid}`).set(true)
    },
    addGameLogg({type,userid,team,gameid}){
      var newPostKey = rootRef.child(`games/${gameid}/logg`).push().key;
      rootRef.child(`loggOfGame/${gameid}/${newPostKey}`).set({type,userid,id:newPostKey,team,time:Date.now()})
    }


};


//MatchResultService.createNewEvent();      // skapar ny typ och serie
//MatchResultService.createNewGame();       // skapar ny match
//MatchResultService.createNewUser();       // skapar ny användare

/*
MatchResultService.getUsers().then(function(va){  // Hämtar alla användare
  //console.log(va);
});

MatchResultService.getGames().then(function(va){  // Hämtar alla Spelade Matcher
  //console.log(va);
});

MatchResultService.getEvents().then(function(va){  // Hämtar alla Event som skapats
  //console.log(va);
});
*/

//MatchResultService.addMemberInGame({gameid:"-L7nS7slhOBXModFBbOn",userid:"-L7nS7soGu-sH2kGlrZy",team:"home"});
//MatchResultService.addMemberInEvent({userid:"-L7nS7soGu-sH2kGlrZy",eventid:"-L7nSR3BtV-9Tc6soPJx"});
//MatchResultService.addGameLogg({type:"assist",gameid:"-L7nS7slhOBXModFBbOn",userid:"-L7nSR3CYTxCtgLbaG_B",team:"home"});
