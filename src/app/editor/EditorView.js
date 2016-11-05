/**
 * Editor component
 *
 * @component: View
 */

import React, {Component} from 'react'

import Tapp from '../core'
import update from 'immutability-helper'

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
      app: new Tapp(),
      currentView: 1,
      timeout: null,
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

  /**
   * Check if component needs updating.
   */
  shouldComponentUpdate(nextProps) {
    if (this.props.app) {
      return this.props.app != nextProps.app
    }
    return true
  }

  /**
   * Update editor value with new props.
   */
  componentWillUpdate(nextProps, nextState) {
    // If content is provided, update.
    if (nextProps.app && nextProps.app != this.state.app) {
      // Update state.
      this.setState({
        app: nextProps.app
      })
      // Make sure editor is updated only on source change.
      if (nextProps.app.source != this.state.app.source) {
        this.setValue(nextProps.app.source)
      }
    }
  }

  setValue = (value) => {
    this.editor.setValue(value);
    this.editor.moveCursorToPosition({row: 0, column: 0});

    var $ = require('jQuery')
    $('html, body').animate({
      scrollTop: 0
    }, 2000)
  }

  /**
   * Event handlers
   */

  onChange = () => {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      // Update the app.
      this.setState(
        // Merge with current state.
        update(this.state, {
          app: {
            source: {$set: this.editor.getValue()}
          }
        })
      )
      // Lift up the app.
      this.props.onUpdate(this.state.app)
    }, 500)
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <Paper zDepth={1}>
        <div id="editor"></div>
        <div style={{marginTop: 1}} />
        <FlatButton label="Settings" />
        <FlatButton style={{float: 'right'}} onTouchTap={this.props.toggleDebugger} label="Debugger" />
        <FlatButton style={{float: 'right'}} onTouchTap={this.props.toggleDrawer} label="Examples" secondary={true} />
      </Paper>
    )
  }
}

export default EditorView;
