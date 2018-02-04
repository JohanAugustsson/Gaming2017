import React from 'react';
import {Link} from '../router';
import { Icon, Menu} from 'semantic-ui-react';
import './Footer.css';

export const Footer = (props) =>{


  return (

    <div className="Footer">
      <Menu icon="labeled" inverted fixed="bottom" widths="4">
        <Link to="/Home">

          <Menu.Item >
            <Icon name="h" className={props.active==="/Home" ? "active":""}/>
            Home
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
            {props.signedIn? "Signed In": "not Signed in"}
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


/*
<Link to="/Home">Home</Link>
<Link to="/Games">Games</Link>
<Link to="/Score">Score</Link>

<Menu icon="labeled" inverted fixed="bottom" widths="4">
  <Menu.Item to="/Home" >
    <Icon name="h" />
    Home
  </Menu.Item>
  <Menu.Item to="/Games">
    <Icon name="gamepad" />
    Games
  </Menu.Item>
  <Menu.Item to="/Table">
    <Icon name="table" />
    Scores
  </Menu.Item>
  <Menu.Item to="/Info">
    <Icon name="info" />
    Info
  </Menu.Item>
</Menu>
*/
