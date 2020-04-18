import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";


export const ContactCard = ({ contact,  history }) => {
  const {
    email,
    firstname,
    lastname,
  } = contact;
  return (
    <Card>
      <CardContent>
        <Typography>{firstname} {lastname}</Typography>
        <Typography>{email}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => history.push('/app/manage-contact', {contact})}>Edit</Button>
        {
          contact && contact.events && contact.events.length > 0 &&
          <Button size="small" onClick={() => history.push('/app/events-by-contact', {contact})}>View {contact.events.length} Contact Event(s)</Button>
        }
      </CardActions>
    </Card>
  );
};