import * as fire from 'firebase';

let config = {
    apiKey: "AIzaSyCOr_NjNqNnL4IBkifBxXQzTePPBln3Px0",
    authDomain: "gamingsite-c35f2.firebaseapp.com",
    databaseURL: "https://gamingsite-c35f2.firebaseio.com",
    projectId: "gamingsite-c35f2",
    storageBucket: "gamingsite-c35f2.appspot.com",
    messagingSenderId: "792512570655"
};

let firebase = fire.initializeApp(config);
export default firebase;
