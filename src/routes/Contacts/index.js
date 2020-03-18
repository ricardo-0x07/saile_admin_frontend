import * as React from "react";
import { Query } from "react-apollo";

import { ContactCard } from "./ContactCard";
import { listContacts, listAccountContacts } from "../../graphql/queries";
import Title from '../../components/Title';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));



const Contacts = (props) => {
  const classes = useStyles();
  console.log('props: ', props);
  return (
    <Query
      query={props.location.state && props.location.state.account  && props.location.state.account ? listAccountContacts(props.location.state.account.id, 10) :  listContacts(10)}
    >
      {({ data, loading }) => {
        console.log('data: ', data);
        if (
          loading ||
          !data ||
          !data.contact ||
          !data.contact
        ) {
          return null;
        }

        console.log(data.contact);

        return (
          <div className={classes.root}>
            <Title>{props.location.state && props.location.state.account  && props.location.state.account ? props.location.state.account.name : '' } Contacts</Title>
            <Button variant="contained" size="small" onClick={() => props.history.push('/manage-contact', {account: props.location.state.account})}>Add Contact</Button>
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
                  <ContactCard contact={x} name={x.name} key={x.id} history={props.history}/>
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
    </Query>
  );
};

export default Contacts