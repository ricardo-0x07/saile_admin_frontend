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

export const CampaignCard = ({ campaign,  history }) => {
  console.log('campaign: ', campaign);
  const { name,  } = campaign;
  return (
    <Card>
      <CardContent>
        <Typography>{name}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => history.push('/manage-campaign', {campaign})}>Edit</Button>
        <Button size="small" onClick={() => history.push('/manage-template', {campaign})}>Add Template</Button>
        <Button size="small" onClick={() => history.push('/manage-schedule', {campaign})}>Add Schedule</Button>
        <Button size="small" onClick={() => history.push('/manage-account', {campaign})}>Add Account</Button>
        <Button size="small" onClick={() => history.push('/templates-by-campaign', {campaign})}>View Templates</Button>
        <Button size="small" onClick={() => history.push('/schedules-by-campaign', {campaign})}>View Schedules</Button>
        <Button size="small" onClick={() => history.push('/accounts-by-campaign', {campaign})}>View Accounts</Button>
      </CardActions>
    </Card>
  );
};