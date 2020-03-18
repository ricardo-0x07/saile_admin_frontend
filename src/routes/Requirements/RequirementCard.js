import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Moment from 'react-moment';


interface Props {
  name: string;
  address: string;
}

export const RequirementCard = ({ requirement,  campaign,  history }) => {
  console.log('requirement: ', requirement);
  const {
    auto_reject,
    city,
    contract_no,
    elasticity,
    function: function_name,
    geography,
    id,
    is_duplicate,
    launch_date,
    ldr_notes,
    level,
    max_hits_per_contact,
    name,
    priority,
    sailebot_id,
    size,
    source,
    state,
  } = requirement;
  console.log('launch_date: ', launch_date)
  const dateToFormat = '1976-04-19T12:59-0500';
  return (
    <Card>
      <CardContent>
        <Typography>Name: {name}</Typography>
        <Typography>
          Launch Date: <Moment format="YYYY-MMM-DD" date={launch_date !== null && launch_date }></Moment>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => history.push('/manage-requirement', {requirement})}>Edit</Button>
        <Button size="small" onClick={() => history.push('/manage-campaign', {requirement})}>Add Campaign</Button>
        <Button size="small" onClick={() => history.push('/campaigns-by-requirement', {requirement})}>View Campaigns</Button>
      </CardActions>
    </Card>
  );
};