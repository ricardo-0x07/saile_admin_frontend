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

export const ScheduleCard = ({ schedule,  campaign,  history }) => {
  console.log('schedule: ', schedule);
  const { name, no_targets_per_accounts, daily_outbound_limit } = schedule;
  return (
    <Card>
      <CardContent>
        <Typography>{name}</Typography>
        <Typography>{no_targets_per_accounts}</Typography>
        <Typography>{daily_outbound_limit}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => history.push('/manage-schedule', {schedule})}>Edit</Button>
      </CardActions>
    </Card>
  );
};