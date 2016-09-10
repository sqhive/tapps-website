/**
 * Editor component
 */

import React, {Component} from 'react'

import { EditorCompilerView } from '.'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class EditorCompiler
  extends Component {

  timeout = null

  constructor(props) {
    super(props)
    this.state = {
      source: null,
      compiled: null,
      message: null,
    }
  }

  stringToByteArray(str) {
  	var array = new (window.Uint8Array !== void 0 ? Uint8Array : Array)(str.length)
  	for (let i = 0, il = str.length; i < il; ++i) {
  		array[i] = str.charCodeAt(i) & 0xff
  	}
  	return array
  }

  compile = (src) => {
    let goog = require('goog'),
        Zlib = require('Zlib')

    let gzip = new Zlib.Gzip(this.stringToByteArray(src))
    let compressed = gzip.compress()
    let code = goog.crypt.base64.encodeByteArray(compressed)

    this.setState({
      source: src,
      compiled: code,
      message: '',
    })
  }

  optimise = () => {
    let Babili = require('Babili')

    try {
      let minified =  Babili.transform(this.state.source, {
        presets: ['react'],
        plugins: [
            'transform-class-properties',
            'transform-object-rest-spread',
            'transform-flow-strip-types'
        ]
      }).code

      console.log("Minified: " + minified.length)
      console.log("Original: " + this.state.source.length)

      let diff = this.state.source.length - minified.length
      this.compile(minified)
      this.message("Yay! Optimised code and reduced its source size by " + diff + " bytes.")

    } catch (error) {
      this.message(error.name + ": " + error.message.split('\n')[0])
    }
  }

  message = (msg) => {
    this.setState({
      message: msg,
    })
  }

  componentWillReceiveProps = (props) => {
    this.compile(props.source)
  }

  render() {
    return (
      <MuiThemeProvider>
        <EditorCompilerView
          source={this.state.source}
          compiled={this.state.compiled}
          optimiser={this.optimise}
          message={this.state.message}
          />
      </MuiThemeProvider>
    );
  }
}

export default EditorCompiler;
