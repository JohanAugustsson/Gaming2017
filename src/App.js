import React from "react";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import PropTypes from 'prop-types';

import {Footer} from './components/'
//import {MatchResultService} from "./services/match-results-service";
import { Games, Scores, Info} from './containers/'

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    static contextTypes = {
      route: PropTypes.string
    } //kommer nu åt vald sida med hjälp av this.context.route


    render() {
          let page = this.context.route;

            return (
                <div>
                    {page==="/Score"? <div><Scores /></div> : ""}
                    {page==="/Games"? <div><Games /></div> : ""}
                    {page==="/Info"? <div><Info /></div> : ""}
                    {page==="/Home"? <div>Home</div> : ""}

                    <Footer active={this.context.route}/>

                </div>
            );
        }
    }
