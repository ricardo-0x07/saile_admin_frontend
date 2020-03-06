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

export const TemplateCard = ({ template,  history }) => {
  console.log('template: ', template);
  const { name, subject } = template;
  return (
    <Card>
      <CardContent>
        <Typography>{name}</Typography>
        <Typography>{subject}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => history.push('/manage-template', {template})}>Edit</Button>
      </CardActions>
    </Card>
  );
};