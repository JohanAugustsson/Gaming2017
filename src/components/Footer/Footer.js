import React from 'react';
import {Link} from '../router';
import { Icon, Menu} from 'semantic-ui-react';
import './Footer.css';

export const Footer = (props) =>{


  return (

    <div className="Footer">
      <Menu icon="labeled" inverted fixed="bottom" widths="5">
        <Link to="/Home">

          <Menu.Item >
            <Icon name="h" className={props.active==="/Home" ? "active":""}/>
            <span id="labelHome">Home</span>
          </Menu.Item>
        </Link>

        <Link to="/Games">
          <Menu.Item>
            <Icon name="gamepad" className={props.active==="/Games" ? "active":""} />
            Games
          </Menu.Item>
        </Link>

        <Link to="/Score">
          <Menu.Item>
            <Icon name="table" className={props.active==="/Score" ? "active":""} />
            Scores
          </Menu.Item>
        </Link>
        <Link to="/Profile">
          <Menu.Item>
            <Icon name="user" className={props.active==="/Profile" ? "active":""} />
            {props.user ? "signed in": "no user"}
          </Menu.Item>
        </Link>

        <Link to="/Info">
          <Menu.Item>
            <Icon name="info" className={props.active==="/Info" ? "active":""} />
            Info
          </Menu.Item>
        </Link>
      </Menu>

    </div>

  )
}
