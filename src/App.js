import React from "react";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import PropTypes from 'prop-types';
import firebase from 'firebase';

import {Footer} from './components/'
import { userService } from "./services/user-login-service";
import { Games, Scores, Info, Profile} from './containers/'

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            user: {},
            signdIn : false
        };
      this.handelClickStatus =  this.handelClickStatus.bind(this)
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
          console.log("inloggad" , user);
          // User is signed in.

          this.setState({user: user, signdIn: true})
        } else {
          this.setState({user: null, signdIn: false})
          console.log("ej inloggad");
          // User is signed out.

        }

      });


    }



    getInfoFromRedirect(){
      firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
        console.log("Inloggning lyckad!" , user);
      }).catch(function(error) {
        // Handle Errors here.
        console.log("Inlogging misslyckades", error);
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });

    }

    handelClickStatus(){
      userService.signInStatus();

      userService.signInStatus2().then((success)=>{
        console.log(success.signIn);


      });
    }

    render() {
          let page = this.context.route;

            return (
                <div>
                    {page==="/Score"? <div><Scores /></div> : ""}
                    {page==="/Games"? <div><Games /></div> : ""}
                    {page==="/Info"? <div><Info /></div> : ""}
                    {page==="/Home"? <div>Home</div> : ""}
                    {page==="/Profile"? <div><Profile user={this.state.user} signdIn={this.state.signdIn} /></div> : ""}

                    <div className="empty">
                    </div>
                      <Footer active={this.context.route}/>



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
