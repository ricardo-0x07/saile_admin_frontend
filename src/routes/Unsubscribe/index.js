import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { createJWTClient,  } from '../../graphql/apollo';
import { ApolloProvider} from "react-apollo";
import { adopt } from 'react-adopt';
import { Query, Mutation } from "react-apollo";
import { getContactById } from "../../graphql/queries";
import { updateContact } from "../../graphql/mutations";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(5),
    // backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Unscubscribe(props) {
  const classes = useStyles();
  console.log('props: ', props);
  const { company, contactEmail, contactId, token } = props.match.params
  const jwt_client = createJWTClient(token)
  const id = Number(contactId)
  const Composed = adopt({
    contactQuery: ({ render }) => (
      <Query query={getContactById(id)} >
        { render }
      </Query>
    ),
    contactMutation: ({ render }) => (
      <Mutation mutation={ updateContact } >
        { render }
      </Mutation>
    ),
  })

  return (
    <ApolloProvider client={jwt_client}>
      <Composed>
        {({ contactQuery: {data, loading}, contactMutation }) => {
          if (!loading) {
          }
          return (
            <Container component="main" maxWidth="md" style={{ height: '100vh' }}>
              <CssBaseline />
              <div className={classes.paper}>
                <div className={classes.avatar}>
                    <Typography component="h1" variant="h2">Unsubscribe</Typography>
                </div>
                <Typography component="h1" variant="h5" style={{ textAlign: 'center', marginBottom: '10px' }}>
                You are trying to unsubscribe <strong>{contactEmail}</strong> from future communications from <strong>{company}</strong>.
                </Typography>
                <Typography component="h2" variant="h6">
                    Kindly click the button below to confirm.
                </Typography>
                <form className={classes.form} noValidate>
                  <Button
                    type="button"
                    fullWidth
                    onClick={async () => {
                      const contact = await contactMutation({
                        variables: {
                            objects: {
                                unsubscribed: true,
                            },
                            id: contactId
                        }
                      });
                      if (contact.data.update_contact && contact.data.update_contact.returning.length > 0 && contact.data.update_contact.returning[0].unsubscribed) {
                        props.history.push('/confirm-unsubscription', {contactEmail, company})
                      }
                    }}
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Yes, Unsubscribe me
                  </Button>
                </form>
              </div>
            </Container>
          );}
        }
      </Composed>
    </ApolloProvider>
  );
}