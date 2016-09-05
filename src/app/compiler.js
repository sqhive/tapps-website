/**
 * Editor component
 */

import React, {Component} from 'react'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Toggle from 'material-ui/Toggle'
import Divider from 'material-ui/Divider'

import CircularProgress from 'material-ui/CircularProgress'
import LinearProgress from 'material-ui/LinearProgress';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const style = {
  width: 300,
  minHeight: 300,
  textAlign: 'center',
  display: 'inline-block',
};

class EditorCompiler
  extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  handleOptimise = () => {
    let goog = require('goog');
    goog.require('goog.crypt.base64');
    console.log(goog.crypt.base64.encodeByteArray(['t', 'e', 'a']))
  }

  render() {
    return (
      <MuiThemeProvider>
        <Card>
          <CardHeader
            title="Compiler"
            subtitle="v1.0.2"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardMedia>
          <div style={{textAlign: 'center'}}>
            <Paper style={style} zDepth={2} rounded={false} >
              <div id="code">
                <CircularProgress size={1.5} />
              </div>
            </Paper>
            </div>
          </CardMedia>
          <div style={{marginTop: 20}}/>
          <FlatButton onTouchTap={this.handleOptimise} label="Optimise" />
          <FlatButton label="Colour" />
          <FlatButton style={{float: 'right'}} label="Share" />
          <CardTitle

            title = "My First Tapp"
            expandable = { true }
          />
          <CardText expandable={true}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default EditorCompiler;
