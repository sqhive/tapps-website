/**
 * Editor component
 */

import React, {Component} from 'react';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const style = {
  width: 300,
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

  render() {
    return (
      <MuiThemeProvider>
        <Card>
          <CardHeader
            title="My First Tapp"
            subtitle="Author"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardMedia>
          <div style={{textAlign: 'center'}}>
            <Paper style={style} zDepth={3} rounded={false} >
              <div id="code"></div>
            </Paper>
            </div>
          </CardMedia>
          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
          <CardActions>
            <FlatButton label="Optimise" />
            <FlatButton label="Colour" />
          </CardActions>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default EditorCompiler;
