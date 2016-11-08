/**
 * Editor
 *
 * @component: Drawer
 *
 */

import React, {Component} from 'react'

import Tapp from '../core'

import Drawer from 'material-ui/Drawer'
import Subheader from 'material-ui/Subheader'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class EditorDrawer
  extends Component {

  examples = [{
      name: 'Restaurant Menu',
      src: './examples/restaurant.tapp',
    },
    {
      name: 'Museum Guide',
      src: './examples/museum.tapp',
    }
  ]

  snippets = [
    {
      name: 'Hello',
      src: './examples/hello.tapp'
    },
    {
      name: 'Counter',
      src: './examples/counter.tapp',
    }
  ]

  constructor(props) {
    super(props)
  }

  handleLoad = (array, id:number) => {
    var $ = require('jQuery')
    $.get(array[id].src, (code) => {
      this.props.onUpdate(new Tapp(
        null,
        null,
        code,
        null
      ))
      this.props.toggle()
    })
  }

  render() {
    return (
      <MuiThemeProvider>
      <Drawer open={this.props.open}>
          <Divider />
          <List>
            <Subheader>Tapps</Subheader>
            <ListItem primaryText="Restaurant Menu"
              onTouchTap={() => { this.handleLoad(this.examples, 0) } } />
            <ListItem primaryText="Museum Guide"
              onTouchTap={() => { this.handleLoad(this.examples, 1) } } />
            <ListItem primaryText="Tube Route" />
            <ListItem primaryText="Tic-tac-toe" />
          </List>
          <Divider />
          <List>
            <Subheader>Snippets</Subheader>
            <ListItem primaryText="Hello" />
            <ListItem primaryText="Counter"
              onTouchTap={() => {this.handleLoad(this.snippets, 1)}}/>
            <ListItem primaryText="Encrypter" />
            <ListItem primaryText="Matulator" />
            <ListItem primaryText="Randomiser" />
          </List>
        </Drawer>
      </MuiThemeProvider>
    );
  }
}

export default EditorDrawer;
