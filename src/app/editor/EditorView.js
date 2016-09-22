/**
 * Editor component
 *
 * @component: View
 */

import React, {Component} from 'react'

import EditorDrawer from '../drawer'
import EditorDebugger from '../debugger'

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

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

  changeView = (event, index, value) => {
    this.setState({
      currentView: value
    })
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
          <Toolbar>
            <ToolbarGroup firstChild={true}>
              <DropDownMenu value={this.state.currentView} onChange={this.changeView}>
                <MenuItem value={1} primaryText="My Hello World" />
              </DropDownMenu>
            </ToolbarGroup>
            <ToolbarGroup>
              <FontIcon className="material-icons">code</FontIcon>
              <FontIcon className="material-icons">settings</FontIcon>
              <ToolbarSeparator />
              <RaisedButton label="Publish" primary={true} />
              <IconMenu
                iconButtonElement={
                  <IconButton touch={true}><MoreVertIcon /></IconButton>
                }
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
              >
                <MenuItem primaryText="Terms & Conditions" />
                <MenuItem primaryText="Help" />
              </IconMenu>
            </ToolbarGroup>
          </Toolbar>
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
