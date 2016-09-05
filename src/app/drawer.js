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

  render() {
    return (
      <MuiThemeProvider>
        <Drawer open={this.props.open}>
          <Divider />
          <List>
            <Subheader>Tapps</Subheader>
            <ListItem primaryText="Restaurant Menu" />
            <ListItem primaryText="Tube Route" />
            <ListItem primaryText="Tic-tac-toe" />
            <ListItem primaryText="Todo List" />
          </List>
          <Divider />
          <List>
            <Subheader>Snippets</Subheader>
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
