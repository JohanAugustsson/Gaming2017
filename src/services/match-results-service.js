import firebase from "./fire";

const rootRef = firebase.database().ref();

export const MatchResultService = {

    getMatchResults()  {
        return rootRef.child('matchResults/innebandy/innebandy2018').once('value').then(snap=> {

            return snap.val();
        });
    },

    getPlayerList()  {
        return rootRef.child('players/').once('value').then(snap=> {

            return snap.val();
        });
    },

    getMatchResultsStream()  {
        return rootRef.child('matchResults').on('value',snap => {
          return snap.val();
        })
    },

    getSelectedMatchStream(match)  {
        return rootRef.child(`matchResults/innebandy/innebandy2018/${match}`).once('value').then(snap=>{
          return snap.val();
        });
    },

    //setMatchResults({serie="innebandy2018",isOvertime=false,isPenaltyShootout=false,players="0"){
    setMatchResults(players,serie,matchId){
      let d = new Date();
      let n = d.getTime();
      let typ = "innebandy";

      return rootRef.child(`matchResults/${typ}/${serie}/${matchId}/`).set({
          isOvertime: false,
          serie: serie,
          typ: "innebandy",
          isPenaltyShootout: false,
          players : players
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
    }
};
