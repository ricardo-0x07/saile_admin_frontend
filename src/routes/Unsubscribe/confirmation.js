import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';



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

export default function Confirmation(props) {
  const classes = useStyles();
  const { company, contactEmail } = props.location.state




  return (
    <Container component="main" maxWidth="md" style={{ height: '100vh' }}>
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.avatar}>
            <Typography component="h1" variant="h2">Unsubscribed Successfully</Typography>
        </div>
        <Typography component="h1" variant="h5" style={{ textAlign: 'center', marginBottom: '10px' }}>
          <strong style={{ textTransform: 'capitalize' }}>{contactEmail}</strong>  Has been Successfully Unsubscribed from  communications with <strong>{company}</strong>.
        </Typography>
      </div>
    </Container>
  );
}