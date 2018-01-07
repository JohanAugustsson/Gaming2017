import fire from "./fire";

const rootRef = fire.database().ref();

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
