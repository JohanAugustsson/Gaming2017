import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import "../../index.css";

import { userService } from "../../services/user-login-service";

export class Profile extends Component{
  handelClick(){
    console.log("hej");
    userService.signIn();
  }
  handelClickLogout(){
    console.log("då");
    userService.signOut();
  }

  render(){
    let userInfo = ""
    if(this.props.signdIn){
      userInfo = `Welcome ${this.props.user.displayName}`
    }else{
      userInfo = `Please sign in before use the app`
    }
    return(
      <div>

        <h1>{userInfo}</h1>
        <button onClick={this.handelClick}>Login</button>
        <button onClick={this.handelClickLogout}>Logout</button>

      </div>


    );
  }
}
