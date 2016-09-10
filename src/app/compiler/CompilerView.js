/**
 * Editor component
 */

import React, {Component} from 'react'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Paper from 'material-ui/Paper'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Toggle from 'material-ui/Toggle'
import Divider from 'material-ui/Divider'
import Snackbar from 'material-ui/Snackbar'
import CircularProgress from 'material-ui/CircularProgress'
import LinearProgress from 'material-ui/LinearProgress';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const style = {
  width: 300,
  minHeight: 300,
  textAlign: 'center',
  display: 'inline-block',
};

class EditorCompilerView
  extends Component {

  constructor(props) {
    super(props);
    this.state = {
      snackMessage: '',
      snackOpen: false,

      openShareMenu: false,
      anchorShareMenu: null,

      showLoader: true,
      showOptimiser: false,
      expanded: false,
    }
  }

  componentWillReceiveProps = (props) => {
    let $ = require('jQuery')

    $('#code').html('').qrcode({
			'ecLevel': 'L',
			'size': 300,
      'fill': '#1ABC9C',
			'text': props.compiled
		});

    if (props.message) this.openSnack(props.message)
  }

  /**
   * Handlers
   */

  handleOptimise = () => {
    this.props.optimiser()
  }

  handleColour = () => {

  }

  handleShare = () => {

  }

  /**
   * State modifiers
   */

  openShareMenu = (event) => {
    event.preventDefault()
    this.setState({
      openShareMenu: true,
      anchorShareMenu: event.currentTarget,
    })
  }

  closeShareMenu = () => {
    this.setState({
      openShareMenu: false,
    })
  }

  openSnack = (message) => {
    this.setState({
      snackMessage: message,
      snackOpen: true,
    })
  }

  closeSnack = () => {
    this.setState({
      snackOpen: false,
    })
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
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
                { this.state.showOptimiser ?
                  <LinearProgress mode="indeterminate" />
                  : null
                }
                <div id="code">
                { this.state.showLoader ?
                  <CircularProgress size={1.5} />
                  : null
                }
                </div>
              </Paper>
              </div>
            </CardMedia>
            <div style={{marginTop: 20}}/>
            <FlatButton onTouchTap={this.handleOptimise} label="Optimise" />
            <FlatButton label="Colour" />
            <FlatButton onTouchTap={this.openShareMenu} style={{float: 'right'}} label="Share" />
            <Popover
              open={this.state.openShareMenu}
              anchorEl={this.state.anchorShareMenu}
              anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              onRequestClose={this.closeShareMenu}>
              <Menu>
                <MenuItem primaryText="Twitter" />
                <MenuItem primaryText="Facebook" />
                <MenuItem primaryText="Google+" />
              </Menu>
            </Popover>
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
          <Snackbar
            open={this.state.snackOpen}
            message={this.state.snackMessage}
            autoHideDuration={4000}
            onRequestClose={this.closeSnack}
          />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default EditorCompilerView;
