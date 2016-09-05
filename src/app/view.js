/**
 * Editor component
 */

import React, {Component} from 'react';

import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class EditorView
  extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <Paper>
          <div id="editor"></div>
        </Paper>
      </MuiThemeProvider>
    );
  }
}

export default EditorView;
