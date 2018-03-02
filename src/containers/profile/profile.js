import React, {Component} from "react";
import "../../index.css";

import {userService} from "../../services/user-login-service";
import Button from "../../components/atoms/button/button";
import Icon from "../../components/atoms/icon/icon";

export class Profile extends Component {

    handelClick(event, providerIs) {
        console.log(event.target);
        console.log(providerIs);
        userService.signIn(providerIs);
    }

    handelClickLogout() {
        userService.signOut();
    }

    render() {
        let userInfo = ""
        if (this.props.user) {
            if (this.props.user.name === undefined) {
                userInfo = 'Loading...'
            } else {
                userInfo = `Welcome ${this.props.user.name}`
            }
        } else {
            userInfo = `Please sign in before use the app`
        }
        return (
            <div>

                <h1>{userInfo}</h1>


                <Button color='facebook' onClick={(e) => this.handelClick(e, "facebook")}>
                    <Icon name='facebook'/> Facebook
                </Button>
                <br/>
                <br/>
                <Button color='google plus' onClick={(e) => this.handelClick(e, "google")}>
                    <Icon name='google'/> Google
                </Button>

                <br/> <br/>
                <Button negative onClick={this.handelClickLogout}>Logout</Button>

                <Button>test</Button>
            </div>

        );
    }
}
