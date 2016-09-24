/**
 * Editor
 *
 * @app: Editor
 */

import React, {Component} from 'react'
import SwipeableViews from 'react-swipeable-views'


import EditorView from './EditorView'
import EditorSettings from './EditorSettings'
import EditorDrawer from '../drawer'
import EditorDebugger from '../debugger'
import EditorCompiler from '../compiler'
import EditorPublisher from '../publisher'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class Editor
  extends Component {

  constructor(props) {
    super(props)
    this.state = {
      slideIndex: 0,
      compilerSource: null,
      compiled: null,
      publish: null,
      openDrawer: false,
      openDebugger: false,
    }
  }

  handleUpdate = (value) => {
    this.setState({
      compilerSource: value
    })
  }

  handleCompile = (value) => {
    this.setState({
      compiled: value
    })
  }

  handleNavigation = (slide) => {
    this.setState({
      slideIndex: slide
    })
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="mdl-grid" style={{maxWidth: '85%'}}>
          <div className="mdl-cell mdl-cell--8-col">
            <EditorPublisher nav={this.handleNavigation} code={this.state.compiled} />
            <SwipeableViews index={this.state.slideIndex}>
              <EditorView onUpdate={this.handleUpdate} />
              <EditorSettings />
            </SwipeableViews>
          </div>
          <div className="mdl-cell mdl-cell--4-col">
            <EditorCompiler source={this.state.compilerSource} onCompile={this.handleCompile} />
            <EditorDrawer open={this.state.openDrawer} toggle={this.toggleDrawer} updater={this.onUpdate} />
            <EditorDebugger open={this.state.openDebugger} />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Editor
