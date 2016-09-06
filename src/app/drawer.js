/**
 * Editor
 *
 * @component: Drawer
 *
 */

import React, {Component} from 'react'

import Drawer from 'material-ui/Drawer'
import Subheader from 'material-ui/Subheader'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class EditorDrawer
  extends Component {

  examples = [{
      name: 'Restaurant Menu',
      src: '/examples/restaurant.tapp',
    },
    {
      name: 'Museum Guide',
      src: '/examples/museum.tapp',
    }
  ]

  constructor(props) {
    super(props)
    this.state = {
      id: 0,
    }
  }

  handleLoad = (id:number) => {
    this.props.updater(this.examples[id].src)
  }

  render() {
    return (
      <MuiThemeProvider>
      <Drawer open={this.props.open}>
          <Divider />
          <List>
            <Subheader>Tapps</Subheader>
            <ListItem primaryText="Restaurant Menu"
              onTouchTap={() => { this.handleLoad(0) } } />
            <ListItem primaryText="Museum Guide"
              onTouchTap={() => { this.handleLoad(1) } } />
            <ListItem primaryText="Tube Route" />
            <ListItem primaryText="Tic-tac-toe" />
          </List>
          <Divider />
          <List>
            <Subheader>Snippets</Subheader>
            <ListItem primaryText="Hello" />
            <ListItem primaryText="Encrypter" />
            <ListItem primaryText="Matulator" />
            <ListItem primaryText="Randomiser" />
            <ListItem primaryText="Counter" />
          </List>
        </Drawer>
      </MuiThemeProvider>
    );
  }
}

export default EditorDrawer;
