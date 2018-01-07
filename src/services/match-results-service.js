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
    }
};
