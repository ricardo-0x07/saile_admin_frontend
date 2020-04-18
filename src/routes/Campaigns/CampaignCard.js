import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";


export const CampaignCard = ({ campaign,  history }) => {
  const { name, accounts_per_schedule } = campaign;
  return (
    <Card>
      <CardContent>
        <Typography>Name: {name}</Typography>
        <Typography>Accounts per schedule: {accounts_per_schedule}</Typography>
      </CardContent>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <CardActions style={{ display: 'flex', flexDirection: 'column' }}>
          <Button size="small" onClick={() => history.push('/app/manage-campaign', {campaign})}>Edit</Button>
          <Button size="small" onClick={() => history.push('/app/manage-template', {campaign})}>Add Template</Button>
          <Button size="small" onClick={() => history.push('/app/manage-schedule', {campaign})}>Add Schedule</Button>
          <Button size="small" onClick={() => history.push('/app/manage-account', {campaign})}>Add Account</Button>
        </CardActions>
        <CardActions style={{ display: 'flex', flexDirection: 'column' }}>
          <Button size="small" onClick={() => history.push('/app/templates-by-campaign', {campaign})}>View Templates</Button>
          <Button size="small" onClick={() => history.push('/app/schedules-by-campaign', {campaign})}>View Schedules</Button>
          <Button size="small" onClick={() => history.push('/app/accounts-by-campaign', {campaign})}>View Accounts</Button>
        </CardActions>
      </div>
    </Card>
  );
};