import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";


export const AccountCard = ({ account,  campaign,  history }) => {
  const { name, address, email } = account;
  return (
    <Card>
      <CardContent>
        <Typography>{name}</Typography>
        <Typography>{address}</Typography>
        <Typography>{email}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => history.push('/app/manage-account', {account})}>Edit</Button>
        <Button size="small" onClick={() => history.push('/app/manage-contact', {account})}>Add Contact</Button>
        <Button size="small" onClick={() => history.push('/app/contacts-by-account', {account})}>View Contacts</Button>
      </CardActions>
    </Card>
  );
};