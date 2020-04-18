import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

interface Props {
  name: string;
  address: string;
}

export const EventCard = ({ event,  history }) => {
  const {
    sender,
    to,
    subject,
    label,
    id,
    date,
    contact_id,
    cc,
    body,
  } = event;
  return (
    <Card>
      <CardContent>
        <Typography>{label}</Typography>
        <Typography>{sender}</Typography>
        <Typography>{subject}</Typography>
      </CardContent>
      <CardActions>
        {/* <Button size="small" onClick={() => history.push('/app/manage-event', {event})}>Edit</Button> */}
      </CardActions>
    </Card>
  );
};