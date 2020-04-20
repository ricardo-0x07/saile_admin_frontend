import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";


export const SaileBotCard = ({ sailebot, client,  history }) => {
  const {name, fullname} = sailebot;
  return (
    <Card>
      <CardContent>
        <Typography>{fullname || name}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => history.push('/app/manage-sailebot', {sailebot, client})}>Edit</Button>
        <Button size="small" onClick={() => history.push('/app/manage-requirement', {sailebot})}>Add Requirement</Button>
        <Button size="small" onClick={() => history.push('/app/manage-domain', {sailebot})}>Add Domain</Button>
        <Button size="small" onClick={() => history.push('/app/requirements-by-sailebot', {sailebot})}>View Requirements</Button>
        <Button size="small" onClick={() => history.push('/app/domains-by-sailebot', {sailebot})}>View Domains</Button>
      </CardActions>
    </Card>
  );
};