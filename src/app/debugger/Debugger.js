/**
 * Editor
 *
 * @component: Debugger
 *
 */

import React, {Component} from 'react'

import Drawer from 'material-ui/Drawer'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import Toggle from 'material-ui/Toggle'
import Checkbox from 'material-ui/Checkbox'
import AppBar from 'material-ui/AppBar'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class EditorDebugger
  extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <Drawer width={200} openSecondary={true} open={this.props.open} >
            <List>
              <ListItem
                primaryText="Debugger"
                secondaryText="Status: compiles"
              />
            </List>
            <Divider />
            <List>
              <Subheader>Debugger Settings</Subheader>
              <ListItem primaryText="Show errors" rightToggle={<Toggle />} />
              <ListItem primaryText="Show suggestions" rightToggle={<Toggle />} />
              <ListItem primaryText="Messages" rightToggle={<Toggle />} />
            </List>
            <Divider />
            <List>
              <Subheader>Error Notifications</Subheader>
              <ListItem primaryText="Include code snippet" leftCheckbox={<Checkbox />} />
              <ListItem primaryText="Point to error line" leftCheckbox={<Checkbox />} />
            </List>
        </Drawer>
      </MuiThemeProvider>
    )
  }
}

export default EditorDebugger;
