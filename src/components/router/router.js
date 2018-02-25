import React , {Component} from 'react';
import PropTypes from 'prop-types';

const getCurrentPath = () =>{
  let path = document.location.pathname
  console.log("path is : "+ path);
  if(path.slice(-1)=="/"){
    console.log("Yes ended with /");
    path = path.substring(0,path.length-1);
    return path.substring(path.lastIndexOf('/'))
  }else {
    console.log("No did not end with /");
    return path.substring(path.lastIndexOf('/'))
  }
}

export class Router extends Component {
  state = {
    route: getCurrentPath()
  }

  handelLinkClick = (route) =>{
    this.setState({route})
    window.history.pushState(null,'', route)
  }


  static childContextTypes = {
    route: PropTypes.string,
    linkHandler: PropTypes.func
  }

  getChildContext(){
    return {
      route: this.state.route,
      linkHandler: this.handelLinkClick
    }
  }

  componentDidMount(){
    window.onpopstate= ()=>{
      this.setState({route: getCurrentPath()})

    }
  }

  render(){

    return(
      <div>
        {this.props.children}
      </div>
    )
  }

}
