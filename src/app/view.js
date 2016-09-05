/**
 * Editor component
 *
 * @component: View
 */

import React, {Component} from 'react'

import EditorDrawer from './drawer'
import EditorDebugger from './debugger'

import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class EditorView
  extends Component {

  constructor(props) {
    super(props)
    this.state = {
      openDrawer: false,
      openDebugger: false,
    }
  }

  toggleDrawer = () => {
    this.setState({
      openDrawer: !this.state.openDrawer
    })
  }

  toggleDebugger = () => {
    this.setState({
      openDebugger: !this.state.openDebugger
    })
  }

  render() {
    return (
      <MuiThemeProvider>
        <Paper zDepth={1}>
          <div id="editor"></div>
          <div style={{marginTop: 1}}/>
          <FlatButton label="Settings" />
          <FlatButton style={{float: 'right'}} onTouchTap={this.toggleDebugger} label="Debugger" />
          <FlatButton style={{float: 'right'}} onTouchTap={this.toggleDrawer} label="Examples" secondary={true} />

          <EditorDrawer open={this.state.openDrawer} />
          <EditorDebugger open={this.state.openDebugger} />
        </Paper>
      </MuiThemeProvider>
    )
  }
}

export default EditorView;
