import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Moment from 'react-moment';
// import * as moment from 'moment';


export const TemplateCard = ({ template, campaign,  history }) => {
  const { name, subject, updated_at } = template;
  return (
    <Card>
      <CardContent>
        <Typography>{name}</Typography>
        <Typography>{subject}</Typography>
        <Typography><strong>Updated:</strong> <Moment format="YYYY-MMM-DD hh:mm:ss" date={updated_at !== null && updated_at }></Moment></Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => history.push('/app/manage-template', {template, campaign})}>Preview</Button>
      </CardActions>
    </Card>
  );
};