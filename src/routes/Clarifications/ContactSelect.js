/* eslint-disable react/prop-types, react/jsx-handler-names */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import { Query, Mutation } from "react-apollo";
import { adopt } from 'react-adopt';
import Button from "@material-ui/core/Button";
// import {
//   FormLabel,
//   FormControl,
//   FormGroup,
//   FormControlLabel,
// } from '@material-ui/core';

import { getContactByEmail } from '../../graphql/queries';
// import { getClientCampaignContacts } from "../../graphql/queries";
import { updateEvent } from "../../graphql/mutations";


const styles = theme => ({
  root: {
    flex: 1,
    // height: 250,
    padding: 2,
    marginTop: 24,
    marginBottom: 8,
    flexDirection: 'row',
    maxWidth: "160px",
  },
  input: {
    display: 'flex',
    padding: -2,
    border: '1px solid rgba(0, 0, 0, 0.42)',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderRadius: '4px',
    height: '48px'
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: `${theme.spacing(1/2)}px ${theme.spacing(1/4)}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
  singleValue: {
    fontSize: '1rem',
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: '1rem',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing(0),
  },
});


class IntegrationReactSelect extends React.Component {
  state = {
    [this.props.name]: '',
    multi: null,
    defaultValue: this.props.defaultValue,
    searchEmail: '',
    search: false
  };
  componentDidUpdate(prevProps, prevState) {
    if(JSON.stringify(prevProps.defaultValue)!==JSON.stringify(this.props.defaultValue)){
      this.setState({
        [this.props.name]: '',
        defaultValue: this.props.defaultValue
      })
    }
  }
  
  onSearchTermChange = async  value => {
    if (value && value.trim().length >= 4) {
      this.setState({searchEmail: value.toLowerCase().trim(), search: true})
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (JSON.stringify(nextProps.defaultValue) !== JSON.stringify(prevState.defaultValue)) {
      return {defaultValue: nextProps.defaultValue}
    }
    return null;
  }

  handleChange = name => event => {
    console.log('name: ', name)
    console.log('event: ', event)
    console.log('event.target: ', event.target)
    console.log('event.target.value: ', event.target.value)
    this.setState({
      [name]: event.target.value,
      searchEmail: event.target.value
    });
    // this.props.handleSelectChange({name, value})
  };
  componentDidMount() {
    this.setState({
      [this.props.name]: ''
    })
  }
  addEventContact = async (updateEventMutation, contact) => {
    console.log('contact: ', contact)
    const { event_id, } = this.props;
    await updateEventMutation({
      variables: {
        objects: { contact_id: contact.id },
        id: event_id
      }
    });
    this.setState({searchEmail: '', search: false})
    const { name } = this.props
    const value = this.state[name]
    this.props.handleSelectChange({name, value})
  }
  

  render() {
    const { classes, name, event_id, } = this.props;
    const { searchEmail, contact } = this.state;
    console.log('name: ', name)
    console.log('contact: ', contact)
    console.log('searchEmail: ', searchEmail)
    console.log('event_id: ', event_id)
    console.log('this.state: ', this.state)
    console.log('this.props: ', this.props)
    const Composed = adopt({
      updateEventMutation: ({ render }) => (
          <Mutation mutation={ updateEvent } >
            { render }
          </Mutation> 
      ),
    })


    return (

      <div className={classes.root}>
        <Composed>
          {
            ( { updateEventMutation } ) => {
              return (
                <div className={classes.root}>
                  <TextField
                      name="smtp_login"
                      label="Contact Email" 
                      variant="filled" 
                      margin="normal" 
                      onChange={this.handleChange(name)}
                      value={this.state[name]}
                  />
                  {/* <Typography><strong>Email:</strong> {this.state.searchEmail}</Typography> */}
                  
                  {
                    this.state.searchEmail.trim().length > 4 &&          
                    <Button size="small" onClick={() => this.onSearchTermChange(this.state.searchEmail)}>Search</Button>
                  }
                  {
                    this.state.search &&
                    <Query query={getContactByEmail(this.state.searchEmail)} >
                      {
                        ({ data, loading }) => {
                          console.log('getContactByEmail data: ', data)
                          if (
                            loading ||
                            !data ||
                            !data.contact ||
                            !data.contact
                          ) {
                            return null;
                          }
                          console.log('getContactByEmail data: ', data)
                          return (
                              <div>
                                {
                                  this.state[name] && data.contact.length > 0 ?
                                  <Button size="small" onClick={() => this.addEventContact(updateEventMutation, data.contact[0])}>Add Contact</Button> 
                                  :
                                  <Typography><strong>Contact with email:</strong> {this.state.searchEmail} <strong>Not Found</strong></Typography>
                                }
                              </div>
                          );

                        }
                      }
                    </Query>
                  }
                </div>
              );
            }
          }
        </Composed>
        <div className={classes.divider} />
      </div>
    );
  }
}


export default withStyles(styles, { withTheme: true })(IntegrationReactSelect);