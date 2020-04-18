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

export const DomainCard = ({ domain,  history }) => {
  const {
    active,
    dns,
    host,
    id,
    ip,
    name,
    provider,
    sailebot_id,
    smtp,
    smtp_login,
    smtp_password,
  } = domain;
  return (
    <Card>
      <CardContent>
        <Typography>{name}</Typography>
        <Typography>{provider}</Typography>
        <Typography>{smtp_login}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => history.push('/app/manage-domain', {domain})}>Edit</Button>
      </CardActions>
    </Card>
  );
};