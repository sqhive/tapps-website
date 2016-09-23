/**
 * Editor
 *
 * @app: Editor
 */

import React, {Component} from 'react'

import EditorView from './EditorView'
import EditorCompiler from '../compiler'
import EditorPublisher from '../publisher'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class Editor
  extends Component {

  constructor(props) {
    super(props)
    this.state = {
      compilerSource: null,
      compiled: null,
      publish: null,
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

  render() {
    return (
      <MuiThemeProvider>
        <div className="mdl-grid" style={{maxWidth: '85%'}}>
          <div className="mdl-cell mdl-cell--8-col">
            <EditorPublisher code={this.state.compiled} />
            <EditorView onUpdate={this.handleUpdate} />
          </div>
          <div className="mdl-cell mdl-cell--4-col">
            <EditorCompiler source={this.state.compilerSource} onCompile={this.handleCompile} />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Editor
