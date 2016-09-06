/**
 * Editor component
 */

import React, {Component} from 'react'

import { EditorCompilerView } from '.'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class EditorCompiler
  extends Component {

  constructor(props) {
    super(props)
    this.state = {
      compiled: null
    }
  }

  stringToByteArray(str) {
  	var array = new (window.Uint8Array !== void 0 ? Uint8Array : Array)(str.length)
  	for (let i = 0, il = str.length; i < il; ++i) {
  		array[i] = str.charCodeAt(i) & 0xff
  	}
  	return array
  }

  componentWillReceiveProps = (props) => {

    let goog = require('goog'),
        Zlib = require('Zlib')

    let gzip = new Zlib.Gzip(this.stringToByteArray(props.source))
    let compressed = gzip.compress()
    let code = goog.crypt.base64.encodeByteArray(compressed)

    this.setState({
      compiled: code
    })
  }

  render() {
    return (
      <MuiThemeProvider>
        <EditorCompilerView compiled={this.state.compiled}/>
      </MuiThemeProvider>
    );
  }
}

export default EditorCompiler;
