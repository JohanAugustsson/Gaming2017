import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import {App} from "./App.js";
import {Router} from "./components/";
import "./index.css";


ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));
registerServiceWorker();
