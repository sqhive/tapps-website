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
      app: null,
      slideIndex: 0,
      openDrawer: false,
      openDebugger: false,
    }
  }

  handleNavigation = (slide) => {
    this.setState({
      slideIndex: slide
    })
  }

  updateApp = (app) => {
    if (app != this.state.app) {
      this.setState({
        app: app
      })
    }
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

  /**
   * Render the component.
   */
  render() {
    return (
      <MuiThemeProvider>
        <div className="mdl-grid" style={{maxWidth: '85%'}}>
          <div className="mdl-cell mdl-cell--8-col mdl-cell--8-col-tablet">
            <EditorPublisher
              app={this.state.app}
              nav={this.handleNavigation}
              onUpdate={this.updateApp} />
            <SwipeableViews index={this.state.slideIndex}>
              <EditorView
                app={this.state.app}
                toggleDebugger={this.toggleDebugger}
                toggleDrawer={this.toggleDrawer}
                onUpdate={this.updateApp} />
              <EditorSettings />
            </SwipeableViews>
          </div>
          <div className="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
            <EditorCompiler
              app={this.state.app}
              onUpdate={this.updateApp} />
            <EditorDrawer open={this.state.openDrawer} toggle={this.toggleDrawer} onUpdate={this.updateView} />
            <EditorDebugger open={this.state.openDebugger} />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Editor
