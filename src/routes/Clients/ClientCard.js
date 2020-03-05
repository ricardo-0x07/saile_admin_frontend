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

export const ClientCard = ({ client,  history }: Props) => {
  console.log('client: ', client);
  const {name} = client;
  return (
    <Card>
      <CardContent>
        <Typography>{name}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => history.push('/manage-client', {client})}>Edit</Button>
        <Button size="small" onClick={() => history.push('/manage-sailebot', {client})}>Add SaileBot</Button>
        <Button size="small" onClick={() => history.push('/sailebots-by-client', {client})}>View SaileBots</Button>
      </CardActions>
    </Card>
  );
};