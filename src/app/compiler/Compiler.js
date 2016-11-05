/**
 * Editor component
 */

import React, {Component} from 'react'

import Tapp from '../core'
import update from 'immutability-helper'

import { EditorCompilerView } from '.'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class EditorCompiler
  extends Component {

  timeout = null

  presets = [
    'react'
  ]

  plugins = [
    'transform-class-properties',
    'transform-object-rest-spread',
    'transform-flow-strip-types'
  ]

  constructor(props) {
    super(props)
    this.state = {
      app: new Tapp(),
      source: null,
      compiled: null,
      message: null,
    }
  }

  componentWillReceiveProps = (props) => {
    if (props.app !== this.props.app) {
      console.log(props.app)
      this.compile(props.app.source)
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
        Zlib = require('Zlib'),
        Babel = require('Babel')

    try {
      Babel.transform(src, {
        presets: this.presets,
        plugins: this.plugins,
      })

    } catch(error) {
      return this.error(error)
    }

    let gzip = new Zlib.Gzip(this.stringToByteArray(src))
    let compressed = gzip.compress()
    let code = goog.crypt.base64.encodeByteArray(compressed)

    this.setState(
      update(this.state, {
        app: {
          source: {$set: src},
          compiled: {$set: code},
        }
      })
    )
    this.setState({
      source: src,
      compiled: code,
      message: '',
    })
    this.props.onCompile(code)
  }

  optimise = () => {
    let Babili = require('Babili')

    try {
      let minified =  Babili.transform(this.state.source, {
        presets: this.presets,
        plugins: this.plugins,
      }).code

      console.log("Minified: " + minified.length)
      console.log("Original: " + this.state.source.length)

      let diff = this.state.source.length - minified.length
      this.compile(minified)
      this.message("Yay! Optimised code and reduced its source size by " + diff + " bytes.")

    } catch (error) {
      this.error(error)
    }
  }

  error = (error) => {
    this.message(error.name + ': ' + error.message.split('\n')[0])
  }

  message = (msg) => {
    this.setState({
      message: msg,
    })
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <MuiThemeProvider>
        <EditorCompilerView
          app={this.state.app}
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
