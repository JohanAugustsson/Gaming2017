import firebase from 'firebase'

export const userService = {

  signIn(providerIs){
    let provider =""
    if(providerIs==="facebook"){
      provider = new firebase.auth.FacebookAuthProvider();
    }else if(providerIs==="google"){
      provider = new firebase.auth.GoogleAuthProvider();
    }else{
      console.log("fel providerIs inskickad till sign in");
    }
    firebase.auth().signInWithRedirect(provider);
  },

  signOut(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
    }).catch(function(error) {
        // An error happened.
    });
  }
}
