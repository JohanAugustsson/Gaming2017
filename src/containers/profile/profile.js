import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Icon } from 'semantic-ui-react'
import "../../index.css";

import { userService } from "../../services/user-login-service";

export class Profile extends Component{

  handelClick(event,providerIs){
    console.log(event.target);
    console.log(providerIs);
    userService.signIn(providerIs);
  }
  handelClickLogout(){
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



      <Button color='facebook' onClick={(e)=> this.handelClick(e,"facebook")} >
        <Icon name='facebook' /> Facebook
      </Button>
      <br/>
      <br/>
      <Button color='google plus' onClick={(e)=> this.handelClick(e,"google")}>
        <Icon name='google' /> Google
      </Button>

        <br/>  <br/>
      <Button negative onClick={this.handelClickLogout}>Logout</Button>
      </div>


    );
  }
}
