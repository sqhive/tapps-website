/**
 * Editor
 *
 * @app: Editor
 */

import React, {Component} from 'react'

import EditorView from './view'
import EditorCompiler from './compiler'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class Editor
  extends Component {

  constructor(props) {
    super(props)
    this.state = {
      compilerSource: null,
    }
  }

  handleUpdate = (value) => {
    this.setState({
      compilerSource: value
    })
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="mdl-grid" style={{maxWidth: '85%'}}>
          <div className="mdl-cell mdl-cell--8-col">
            <EditorView onUpdate={this.handleUpdate} />
          </div>
          <div className="mdl-cell mdl-cell--4-col">
            <EditorCompiler source={this.state.compilerSource}/>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Editor;
