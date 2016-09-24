/**
 * Editor component
 *
 * @component: Settings
 */

import React, {Component} from 'react'
import Card, {CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import Chip from 'material-ui/Chip'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class EditorSettings
  extends Component {

  constructor(props) {
    super(props)
    this.state = {
      field: "",
      chips: [
        { value: 0, label: "test"}
      ]
    }
  }

  addChip = (event) => {
    event.preventDefault()
    this.setState({
      field: "",
      chips: this.state.chips.concat({ value: 0, label: this.state.field})
    })
  }

  updateField = (event, value) => {
    this.setState({
      field: value
    })
  }

  render() {
    return (
      <MuiThemeProvider>
        <Paper zDepth={1} style={{minHeight: 300}}>
          <center><h4 style={{marginTop: 0, paddingTop: 25}}>Characterisation</h4></center>
          <div style={{display: 'flex', flexWrap: 'wrap', padding: 20}}>
            <div style={{margin: '0 auto', width: '45%'}}>
              <Card>
                <CardHeader
                  title="Terms"
                  subtitle="Word Description"
                  actAsExpander={true}
                  showExpandableButton={false}
                />
                <CardActions>
                </CardActions>
                <CardTitle>
                  <form onSubmit={this.addChip}>
                    <TextField inputStyle={{border: 0}} value={this.state.field} onChange={this.updateField} hintText="Terms"/>
                  </form>
                </CardTitle>
                <CardText>
                  <div style={{display: 'flex', flexWrap: 'wrap'}}>
                  {this.state.chips.map((chip, i) => {
                    return (
                      <Chip
                        key={i}
                        onRequestDelete={() => this.handleRequestDelete(data.key)}
                        style={{margin: 5}}>
                        {chip.label}
                      </Chip>
                    )
                  })}
                  </div>
                </CardText>
              </Card>
            </div>
            <div style={{margin: '0 auto', width: '45%'}}>
              <Card>
                <CardHeader
                  title="Object"
                  subtitle="Graphical Description"
                  actAsExpander={true}
                  showExpandableButton={false}
                />
                <CardText>
                  Upload image
                </CardText>
              </Card>
            </div>
          </div>
        </Paper>
      </MuiThemeProvider>
    )
  }
}

export default EditorSettings
