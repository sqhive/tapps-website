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
              <Subheader>Priority Interruptions</Subheader>
              <ListItem primaryText="Events and reminders" rightToggle={<Toggle />} />
              <ListItem primaryText="Calls" rightToggle={<Toggle />} />
              <ListItem primaryText="Messages" rightToggle={<Toggle />} />
            </List>
            <Divider />
            <List>
              <Subheader>Hangout Notifications</Subheader>
              <ListItem primaryText="Notifications" leftCheckbox={<Checkbox />} />
              <ListItem primaryText="Sounds" leftCheckbox={<Checkbox />} />
              <ListItem primaryText="Video sounds" leftCheckbox={<Checkbox />} />
            </List>
        </Drawer>
      </MuiThemeProvider>
    )
  }
}

export default EditorDebugger;
