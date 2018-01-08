import firebase from "./fire";

const rootRef = firebase.database().ref();

export const MatchResultService = {

    getMatchResults()  {
        return rootRef.child('matchResults').once('value').then(function (snapshot) {
            return snapshot.val();
        });
    },

    getMatchResultsStream()  {
        return rootRef.child('matchResults').on('value',snap => {
          return snap.val();
        })
    },

    //setMatchResults({serie="innebandy2018",isOvertime=false,isPenaltyShootout=false,players="0"){
    setMatchResults(players){
      let d = new Date();
      let n = d.getTime();
      let serie = "innebandy2018";


      return rootRef.child(`matchResults/${serie}/${n}/`).set({
          isOvertime: false,
          isPenaltyShootout: false,
          players : players
      });
    }
};
