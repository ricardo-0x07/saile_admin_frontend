import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";


export const ContactCard = ({ contact, account,  history }) => {
  const {
    email,
    title,
    firstname,
    lastname,
    management_level,
    job_function,
    email_status,
  } = contact;
  return (
    <Card>
      <CardContent>
        <Typography>Name: {firstname} {lastname}</Typography>
        <Typography>Email: {email}</Typography>
        <Typography>Title: {title}</Typography>
        <Typography>Level: {management_level || ''}</Typography>
        <Typography>Function: {job_function || ''}</Typography>
        <Typography>Email Status: {email_status || ''}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => history.push('/app/manage-contact', {contact, account})}>Edit</Button>
        {
          contact && contact.events && contact.events.length > 0 &&
          <Button size="small" onClick={() => history.push('/app/events-by-contact', {contact})}>View {contact.events.length} Contact Event(s)</Button>
        }
      </CardActions>
    </Card>
  );
};