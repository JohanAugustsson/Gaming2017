import React from 'react';
import {Link} from '../router';
import './Footer.css';

export const Footer = (props) =>{


  return (

    <div className="Footer">
          <div id="menu">
            <Link to="/Home" className="menuItem">
              <div name="h" className={props.active==="/Home" ? "active":""}><span id="labelHome">Home</span></div>

            </Link>

            <Link to="/Games" className="menuItem">
              <div name="gamepad" className={props.active==="/Games" ? "active":""} >Games</div>
            </Link>

            <Link to="/Score" className="menuItem">
              <div name="table" className={props.active==="/Score" ? "active":""} >Score</div>
            </Link>


            <Link to="/Profile" className="menuItem">
              <div name="user" className={props.active==="/Profile" ? "active":""}>{props.user ? "signed in": "no user"}</div>
            </Link>

            <Link to="/Info" className="menuItem">
              <div name="info" className={props.active==="/Info" ? "active":""} >Info</div>
            </Link>
        </div>




    </div>

  )
}
