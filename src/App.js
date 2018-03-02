import React from "react";
import "./index.css";
import PropTypes from 'prop-types';
import firebase from 'firebase';

import {Footer} from './components/'
//import { userService } from "./services/user-login-service";
import { Games, Scores, Info, Profile} from './containers/'

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            user: {}

        };
      this.signInStatus =  this.signInStatus.bind(this)
      this.getInfoFromRedirect =  this.getInfoFromRedirect.bind(this)
    }

    static contextTypes = {
      route: PropTypes.string
    } //kommer nu åt vald sida med hjälp av this.context.route


    componentDidMount(){
      this.signInStatus();
      this.getInfoFromRedirect();
    }

    signInStatus(){
      firebase.auth().onAuthStateChanged((user)=> {
        if (user) {
          //console.log("inloggad" , user);
          // User is signed in.
          let userInfo = {
            name: user.displayName,
            email: user.email,
            uid : user.uid,
            emialVerified : user.emailVerified,
            isAnonymous : user.isAnonymous
          }

          this.setState({user: userInfo})
        } else {
          this.setState({user: null})
          //console.log("ej inloggad");
          // User is signed out.
        }
      });
    }



    getInfoFromRedirect(){
      firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          //var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        //var user = result.user;
        //console.log("Inloggning lyckad!" , user);
      }).catch(function(error) {
        // Handle Errors here.
        //console.log("Inlogging misslyckades", error);
        var errorCode = error.code;
        console.log(errorCode);
        var errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        var email = error.email;
        console.log(email);
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(credential);
        // ...
      });

    }


    render() {
          let page = this.context.route;
          if(page===""){
            page="/Home"
          }
          console.log("render " + page);
            return (
                <div>
                    {page==="/Score"? <div><Scores /></div> : ""}
                    {page==="/Games"? <div><Games /></div> : ""}
                    {page==="/Info"? <div><Info /></div> : ""}
                    {page==="/Home"? <div>Home</div> : ""}
                    {page==="/Profile"? <div><Profile user={this.state.user} /></div> : ""}

                    <div className="empty">
                    </div>
                      <Footer active={this.context.route} user={this.state.user}/>
                </div>
            );
        }
    }



/*
let myPromise = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    resolve("success");
  },2500)
});

myPromise.then((success)=>{
  console.log("Yah"+ success);
});











      userService.signInStatus2().then((success)=>{
        this.setState({
          user : success
        })
      });
*/
