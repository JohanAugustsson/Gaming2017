import firebase from 'firebase'

export const userService = {

  /*
  test(){
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve("success");
      },2500)
    });
  },


  signInStatus2(){
    return new Promise((resolve,reject)=>{
      firebase.auth().onAuthStateChanged(function(user) {
        if(user){
          let userInfo = {
            signIn: true,
            name: user.displayName,
            email: user.email,
            uid : user.uid,
            emialVerified : user.emailVerified,
            isAnonymous : user.isAnonymous
          }
          resolve(userInfo);
        }else{
          resolve({signIn : false});
        }
      });
    });
  },

  signInStatus(){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log("inloggad");
        // User is signed in.

      } else {
        console.log("ej inloggad");
        // User is signed out.
        // ...
      }
    });

  },
  */

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
