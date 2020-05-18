import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";


export const EventCard = ({ event }) => {
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
  const insertBody = (body) => {
    return (
      <React.Fragment>
        <Typography>Body: </Typography>
        {
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
        {
          insertBody(body)
        }
      </CardContent>
    </Card>
  );
};