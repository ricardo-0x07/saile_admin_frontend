/* eslint-disable react/prop-types, react/jsx-handler-names */

import React from 'react';
import classNames from 'classnames';
import Select from 'react-select';
// import Creatable from 'react-select/lib/Creatable';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import { Query, Mutation } from "react-apollo";
import { adopt } from 'react-adopt';
import Button from "@material-ui/core/Button";

import { searchAccounts } from '../../graphql/queries';
// import { getClientCampaignAccounts } from "../../graphql/queries";
import { createCampaignAccount } from "../../graphql/mutations";


const styles = theme => ({
  root: {
    flexGrow: 1,
    // height: 250,
    padding: 2,
    marginTop: 24,
    marginBottom: 8,
    // maxWidth: "160px",
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

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          style: { fontWeight: 'normal' },
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 300 : 200,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

class IntegrationReactSelect extends React.Component {
  state = {
    [this.props.name]: this.props.defaultValue,
    multi: null,
    defaultValue: this.props.defaultValue,
    searchTerm: ''
  };
  componentDidUpdate(prevProps, prevState) {
    if(JSON.stringify(prevProps.defaultValue)!==JSON.stringify(this.props.defaultValue)){
      this.setState({
        [this.props.name]: this.props.defaultValue,
        defaultValue: this.props.defaultValue
      })
      const { name, defaultValue } = this.props;
      this.props.handleSelectChange({ name, value: defaultValue})
    }
  }
  
  onSearchTermChange = value => {
    if (value && value.trim().length >= 4) {
      this.setState({searchTerm: value})
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (JSON.stringify(nextProps.defaultValue) !== JSON.stringify(prevState.defaultValue)) {
      return {defaultValue: nextProps.defaultValue}
    }
    return null;
  }

  handleChange = name => value => {
    // const category = this.props.productServiceCategories[this.props.services[value.value].productServiceCategoryId].name;
    // value.label = `${category}:${value.label}`;
    this.setState({
      [name]: value,
    });
    this.props.handleSelectChange({name, value})
  };
  componentDidMount() {
    this.setState({
      [this.props.name]: this.props.defaultValue
    })
  }
  addAccounts = async (createCampaignAccountMutation, selectedAccounts) => {
    console.log('selectedAccounts[0].value: ', selectedAccounts[0].value)
    // const selectedAccounts = []
    // const campaign_id = this.props.location.state.campaign.id
    const { campaign_id, } = this.props;
    await createCampaignAccountMutation({
      variables: {
        objects: selectedAccounts.map(account => {
          return { campaign_id, account_id: account.value }
        })
      }
    });
    this.setState({searchTerm: ''})
  }
  

  render() {
    const { classes, theme, placeholder, name, campaign_id, } = this.props;
    const { searchTerm } = this.state;
    console.log('this.state: ', this.state)
    console.log('this.props.sailebo: ', this.props.sailebo)
    const Composed = adopt({
      // clientCampaignAccountQuery: ({ render }) => (
      //   <Query query={getClientCampaignAccounts(this.props.sailebot.client_id)} >
      //     { render }
      //   </Query>
      // ),
      createCampaignAccountMutation: ({ render }) => (
          <Mutation mutation={ createCampaignAccount } >
            { render }
          </Mutation> 
      ),
      query: ({ render }) => (
        <Query query={searchAccounts(searchTerm, campaign_id, this.props.sailebot.client_id)} >
          { render }
        </Query>
      ),
    })
    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    };

    return (

      <div className={classes.root}>
        <Composed>
          {
            ( { query, createCampaignAccountMutation } ) => {
              return (
                <React.Fragment>
                  <Select
                    classes={classes}
                    styles={selectStyles}
                    placeholder={placeholder}
                    options={query.data ? query.data.account.map(company => ({value: company.id, label: company.name})) : []}
                    components={components}
                    value={this.state[name]}
                    onChange={this.handleChange(name)}
                    isClearable
                    onInputChange={this.onSearchTermChange}
                    isMulti
                  />
                  <Button size="small" onClick={() => this.addAccounts(createCampaignAccountMutation, this.state[name])}>Add Selected</Button>
                </React.Fragment>
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