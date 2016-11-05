/**
 * Publisher
 *
 * @app: Editor
 */

import React, {Component} from 'react'
import Firebase from 'firebase'

import Tapp from '../core'

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import Paper from 'material-ui/Paper'
import Dialog from 'material-ui/Dialog'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

import Avatar from 'material-ui/Avatar'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

class EditorPublisher
  extends Component {

    /**
     * Default constructor.
     */
    constructor(props) {
      super(props)
      // Initial state.
      this.state = {
        token: null,
        user: null,
        isLoggedIn: false,
        myTapps: [],
        currentTapp: null,
        currentView: 0,
        loginDialog: false,
        errorDialog: false,
      }
    }

    componentWillMount = () => {
      // The Firebase config
      let config = {
        apiKey: "AIzaSyCti6aFh6pOPErekjMpzuRdMIwt2-PL0yc",
        authDomain: "tapps-ff941.firebaseapp.com",
        databaseURL: "https://tapps-ff941.firebaseio.com",
        storageBucket: "tapps-ff941.appspot.com",
        messagingSenderId: "422150297300"
      }
      // Initialise config
      Firebase.initializeApp(config)
      this.initAuth()
      this.tappsRef = Firebase.database().ref('tapps')
      this.usersRef = Firebase.database().ref('users')
    }

    componentDidMount = () => {
      let tapps = []
      this.tappsRef.limitToLast(25).once('value', (list) => {
        list.forEach((tapp) => {
          tapps.push(tapp.key)
        })
        this.setState({
          myTapps: tapps,
          currentTapp: tapps[0]
        })
      })
    }

    /**
     * Clear database references.
     */
    componentWillUnmount = () => {
      this.tappsRef.off()
      this.usersRef.off()
    }

    /**
     * Initialise Firebase authentication.
     */
    initAuth = () => {
      Firebase.auth().getRedirectResult().then((result) => {
        if (result.credential) {
          this.setState({
            user: result.user,
            token: result.credential.accessToken
          })
        }
      }).catch((error) => {
        this.openErrorDialog(error.message)
      })

      Firebase.auth().onAuthStateChanged((user) => {
        this.setState({
          user: user || null
        })
      })
    }

    /**
     * Redirect to login.
     * @return {[type]} [description]
     */
    proceedLogin = () => {
      let provider = new Firebase.auth.GoogleAuthProvider()
      provider.addScope('https://www.googleapis.com/auth/plus.login')
      Firebase.auth().signInWithRedirect(provider)
    }

    checkLogin = () => {
      if (!Firebase.auth().currentUser) {
        this.openLoginDialog()
        return true
      }
      return false
    }

    logOut = () => {
      Firebase.auth().signOut()
    }

    /**
     * Create a new Tapp.
     */
    addTapp = () => {
      this.tappsRef.push({
          owner: this.state.user.uid,
      }).then((snapshot) => {
        console.log(snapshot.key)
      })
    }

    /**
     * Update a Tapp.
     * @return {[type]} [description]
     */
    updateTapp = () => {
      // Check if user is logged in.
      if (this.checkLogin()) return
      // Publish the Tapp.
      try {
        // Obtain a reference.
        let tappRef = this.tappsRef.child(this.state.currentTapp)
        // Update record.
        tappRef.update({
          name: 'My First Tapp',
          code: this.props.app.code,
          source: this.props.app.source,
          owner: Firebase.auth().currentUser.uid,
        })
      } catch (error) {
        this.openErrorDialog(error.message)
      }
    }

    removeTapp = () => {
      this.tappsRef
        .child(this.state.currentTapp)
        .remove((error) => {
          if (error) {

          }

        })
    }


    /**
     * Handlers
     */
     changeView = (event, index, value) => {
       this.setState({
         currentTapp: this.state.myTapps[value],
         currentView: value
       })

      this.tappsRef.child(this.state.myTapps[value]).once('value', (snapshot) => {
        this.props.onUpdate(new Tapp(
          snapshot.key,
          snapshot.val().owner,
          snapshot.val().source,
        ));
      })

     }


     onAdd = () => {
       // Check if user is logged in.
       if (this.checkLogin()) return
       // Add new entry to database.
       this.addTapp()
     }

     onRemove = () => {
       this.removeTapp()
     }

     onPublish = () => {
       this.updateTapp()
     }

    /**
     * Open the error dialog.
     * @param  {String} message The message to display
     */
    openErrorDialog = (message) => {
      this.setState({
        errorDialog: true,
        errorMessage: message
      })
    }

    /**
     * Close the error dialog.
     */
    closeErrorDialog = () => {
        this.setState({
          errorDialog: false
        })
    }

    openLoginDialog = () => {
      this.setState({
        loginDialog: true
      })
    }
    closeLoginDialog = () => {
      this.setState({
        loginDialog: false
      })
    }

    /**
     * Render the component.
     */
    render() {
      return (
        <Paper zDepth={1}>
          <Toolbar>
            <ToolbarGroup firstChild={true}>
              <DropDownMenu autoWidth={false} value={this.state.currentView} onChange={this.changeView}>
                {this.state.myTapps.map((o, i) => {
                    return <MenuItem key={i} value={i} primaryText={o} />
                  }
                )}
                <Divider/>
                <MenuItem primaryText="Create New Tapp" onTouchTap={this.onAdd} />
              </DropDownMenu>
            </ToolbarGroup>
            <ToolbarGroup>
              <FontIcon className="material-icons" onTouchTap={() => {this.props.nav(0)}}>code</FontIcon>
              { (this.state.user) ?
              <FontIcon className="material-icons" onTouchTap={() => {this.props.nav(1)}}>settings</FontIcon>
              : null
              }
              { (this.state.user) ?
              <FontIcon className="material-icons" onTouchTap={this.onRemove}>delete</FontIcon>
              : null
              }
              <ToolbarSeparator />
              { (this.state.user) ?
              <Avatar style={{margin: '8px 0 0 24px'}} src={this.state.user.photoURL} />
              : null
              }
              <RaisedButton label="Publish" primary={true} onTouchTap={this.onPublish} />
              <IconMenu
                iconButtonElement={
                  <IconButton touch={true}><MoreVertIcon /></IconButton>
                }
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
              >
                <MenuItem primaryText="Sign out" onTouchTap={this.logOut}  />
                <Divider />
                <MenuItem primaryText="Terms & Conditions" />
                <MenuItem primaryText="Help" />
              </IconMenu>
            </ToolbarGroup>
          </Toolbar>
          <Dialog
            title="Login Required"
            actions={[
              <FlatButton
                label="Cancel"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.closeLoginDialog}
              />,
              <FlatButton
                label="Login"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.proceedLogin}
              />
            ]}
            modal={true}
            open={this.state.loginDialog} >
            You need to log-in before you can publish a Tapp.
          </Dialog>
          <Dialog
            title="Error"
            actions={
              <FlatButton
                label="Okay"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.closeErrorDialog}
              />
            }
            modal={false}
            open={this.state.errorDialog} >
            {this.state.errorMessage}
          </Dialog>
        </Paper>
      )
    }
  }

  export default EditorPublisher
