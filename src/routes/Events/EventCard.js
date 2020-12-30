import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export const EventCard = ({ event }) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    showBody: false,
  });
  const {
    sender,
    subject,
    label,
    to,
    body,
  } = event;
  function createMarkup(body) {
    return {__html: body};
  }
  const handleChange = async () => {
    await setState({ ...state, showBody: !state.showBody });
  }
  const insertBody = (body) => {
    return (
      <React.Fragment>
        <Typography>Body: </Typography>
        {
          // body.split("\n").map((el, key) => el ? <div key={key} dangerouslySetInnerHTML={createMarkup(el)} /> : <br key={key}/>)//.slice(0,19)
          // <div dangerouslySetInnerHTML={createMarkup(body)} />
          body.split("\n").map((el, key) => el ? <div key={key} dangerouslySetInnerHTML={createMarkup(el)} /> : <br key={key}/>)//.slice(0,19)

          
        }
      </React.Fragment>
    );
  }
  // console.log(body.split("\n").slice(0,4))
  return (
    <Card>
      <CardContent>
        <Typography>Label: {label}</Typography>
        <Typography>From: {sender}</Typography>
        <Typography>To: {to}</Typography>
        <Typography>Subject: {subject}</Typography>
        <CardActions className={classes.root}>
          <Button variant="contained" size="small" onClick={handleChange}>{!state.showBody ? "View Body" : "Hide Body"}</Button>
        </CardActions>
        {
          state.showBody &&
          insertBody(body)
        }
      </CardContent>
    </Card>
  );
};