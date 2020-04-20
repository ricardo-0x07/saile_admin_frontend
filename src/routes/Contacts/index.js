import * as React from "react";
import { Subscription } from "react-apollo";

import { ContactCard } from "./ContactCard";
import { listContacts, listAccountContacts } from "../../graphql/subscription";
import Title from '../../components/Title';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import { adopt } from 'react-adopt';


const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));



const Contacts = (props) => {
  const classes = useStyles();
  const Composed = adopt({
    contactsSubscription: props.location.state && props.location.state.account && props.location.state.account.id ?
    ({ render }) => (
      <Subscription subscription={listAccountContacts(props.location.state.account.id)} >
        { render }
      </Subscription>
    )
    :
    ({ render }) => (
      <Subscription subscription={listContacts(10) } >
        { render }
      </Subscription>
    ),
  })
  return (
    <Composed>
      {({ contactsSubscription: {data, loading} }) => {
        if (
          loading ||
          !data ||
          !data.contact ||
          !data.contact
        ) {
          return null;
        }

        return (
          <div className={classes.root}>
            <Title>{props.location.state && props.location.state.account  && props.location.state.account ? props.location.state.account.name : '' } Contacts</Title>
            <Button variant="contained" size="small" onClick={() => props.history.push('/app/manage-contact', {account: props.location.state.account})}>Add Contact</Button>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gridGap: 10
              }}
            >
              {
                props.location.state && props.location.state.account  && props.location.state.account ?
                data.contact.filter(item => item.account_id === props.location.state.account.id ).map(x => (
                  <ContactCard contact={x} name={x.name} key={x.id} history={props.history} account={props.location.state.account}/>
                ))
                :
                data.contact.filter(item => item ).map(x => (
                  <ContactCard contact={x} name={x.name} key={x.id}  history={props.history} />
                ))
              }
            </div>
          </div>
        );
      }}
    </Composed>
  );
};

export default Contacts