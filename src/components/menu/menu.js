import React, {Component} from 'react';
import { Icon, Menu} from 'semantic-ui-react';

export class MenuAtBott extends Component {
  state = {
    activeItem: "home"
  }



  handelItemClick = (event, {name} ) =>{
    this.setState({
      activeItem: name
    })
    window.history.pushState(null,'', name)
    this.props.changePage(name);
  }

  render(){
    const { activeItem } = this.state

    return (
      <Menu icon="labeled" inverted fixed="bottom" widths="4">
        <Menu.Item name="Home" active={activeItem==='Home'} onClick={this.handelItemClick}>
          <Icon name="h" />
          Home
        </Menu.Item>
        <Menu.Item name="Games" active={activeItem==='Games'} onClick={this.handelItemClick}>
          <Icon name="gamepad" />
          Games
        </Menu.Item>
        <Menu.Item name="Table" active={activeItem==='Table'} onClick={this.handelItemClick}>
          <Icon name="table" />
          Scores
        </Menu.Item>
        <Menu.Item name="Info" active={activeItem==='Info'} onClick={this.handelItemClick}>
          <Icon name="info" />
          Info
        </Menu.Item>
      </Menu>


    )
  }


}