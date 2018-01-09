import firebase from "./fire";

const rootRef = firebase.database().ref();

export const MatchResultService = {

    getMatchResults()  {
        return rootRef.child('matchResults/innebandy2018').once('value').then(snap=> {

            return snap.val();
        });
    },

    getMatchResultsStream()  {
        return rootRef.child('matchResults').on('value',snap => {
          return snap.val();
        })
    },

    //setMatchResults({serie="innebandy2018",isOvertime=false,isPenaltyShootout=false,players="0"){
    setMatchResults(players,serie){
      let d = new Date();
      let n = d.getTime();

      return rootRef.child(`matchResults/${serie}/${n}/`).set({
          isOvertime: false,
          isPenaltyShootout: false,
          players : players
      });
    }
};
