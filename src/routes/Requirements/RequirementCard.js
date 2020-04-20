import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Moment from 'react-moment';


export const RequirementCard = ({ requirement,  campaign, sailebot,  history }) => {
  const {
    launch_date,
    name,
  } = requirement;
  return (
    <Card>
      <CardContent>
        <Typography>Name: {name}</Typography>
        <Typography>
          Launch Date: <Moment format="YYYY-MMM-DD" date={launch_date !== null && launch_date }></Moment>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => history.push('/app/manage-requirement', {requirement, sailebot})}>Edit</Button>
        <Button size="small" onClick={() => history.push('/app/manage-campaign', {requirement})}>Add Campaign</Button>
        <Button size="small" onClick={() => history.push('/app/campaigns-by-requirement', {requirement})}>View Campaigns</Button>
      </CardActions>
    </Card>
  );
};