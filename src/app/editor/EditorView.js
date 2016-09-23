/**
 * Editor component
 *
 * @component: View
 */

import React, {Component} from 'react'

import EditorDrawer from '../drawer'
import EditorDebugger from '../debugger'

import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class EditorView
  extends Component {

  timeout = null
  editor = null

  constructor(props) {
    super(props)
    this.state = {
      currentView: 1,
      timeout: null,
      openDrawer: false,
      openDebugger: false,
    }
  }

  componentDidMount = () => {
    this.editor = require('ace').edit('editor')
    this.editor.setOptions({
      maxLines: Infinity,
      fontSize: "11pt"
    });
    this.editor.setTheme('ace/theme/chrome')
    this.editor.getSession().setMode('ace/mode/jsx')
    this.editor.setValue('working')

    this.editor.on('change', this.onChange)

    var $ = require('jQuery')
    $.get('./examples/hello.tapp', (data) => {
      this.editor.setValue(data);
      this.editor.moveCursorToPosition({row: 0, column: 0});
    })

  }

  onChange = () => {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.props.onUpdate(this.editor.getValue())
    }, 500)
  }

  onUpdate = (src) => {
    var $ = require('jQuery')
    $.get(src, (data) => {
      this.editor.setValue(data);
      this.editor.moveCursorToPosition({row: 0, column: 0});
    })
    $('html, body').animate({
      scrollTop: 0
    }, 2000)
  }

  /**
   * Toggle EditorDrawer open state.
   */
  toggleDrawer = () => {
    this.setState({
      openDrawer: !this.state.openDrawer
    })
  }

  /**
   * Toggle EditorDebugger open state.
   */
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

          <EditorDrawer open={this.state.openDrawer} toggle={this.toggleDrawer} updater={this.onUpdate} />
          <EditorDebugger open={this.state.openDebugger} />
        </Paper>
      </MuiThemeProvider>
    )
  }
}

export default EditorView;
