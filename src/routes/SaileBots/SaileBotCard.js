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

export const SaileBotCard = ({ sailebot,  history }) => {
  console.log('sailebot: ', sailebot);
  const {name, fullname} = sailebot;
  return (
    <Card>
      <CardContent>
        <Typography>{fullname || name}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => history.push('/manage-sailebot', {sailebot})}>Edit</Button>
        <Button size="small" onClick={() => history.push('/manage-requirement', {sailebot})}>Add Requirement</Button>
        <Button size="small" onClick={() => history.push('/manage-domain', {sailebot})}>Add Domain</Button>
        <Button size="small" onClick={() => history.push('/requirements-by-sailebot', {sailebot})}>View Requirements</Button>
        <Button size="small" onClick={() => history.push('/domains-by-sailebot', {sailebot})}>View Domains</Button>
      </CardActions>
    </Card>
  );
};