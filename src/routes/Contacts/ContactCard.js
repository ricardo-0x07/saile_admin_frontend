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

export const ContactCard = ({ contact,  history }) => {
  const {
    account_id,
    bounce_type,
    email,
    fax,
    first_outbound_done,
    firstname,
    gender,
    id,
    is_ema_eligible,
    is_eva_eligible,
    is_referral,
    lastname,
    member_status,
    phone,
    position,
    role,
    sam_status,
    second_outbound_done,
    source,
    title,
    to_followup,
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