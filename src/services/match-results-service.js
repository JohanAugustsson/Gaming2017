import firebase from "./fire";

const rootRef = firebase.database().ref();

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
    }



};
