/**
 * Publisher
 *
 * @app: Editor
 */

import React, {Component} from 'react'
import Firebase from 'firebase'

class EditorPublisher
  extends Component {

    constructor(props) {
      super(props)
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
      this.tappsRef = Firebase.database().ref('tapps')
    }

    componentWillUnmount = () => {
      this.tappsRef.off()
    }

    addTapp = () => {
      this.firebaseRef.push({
        code: this.props.code
      })
    }

    updateTapp = () => {

    }

    render() {
      return <div></div>
    }

  }

  export default EditorPublisher
