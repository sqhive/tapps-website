/**
 * Editor component
 *
 * @component: View
 */

import React, {Component} from 'react'

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
    if (this.props.content) {
      return this.props.content != nextProps.content
    }
    return true
  }

  /**
   * Update editor value with new props.
   */
  componentWillUpdate(nextProps, nextState) {
    // If content is provided, update.
    if (nextProps.content) {
      this.setValue(nextProps.content.source)
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
      this.props.onUpdate(this.editor.getValue())
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
