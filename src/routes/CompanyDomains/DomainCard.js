import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export const DomainCard = ({ domain, company,  history }) => {
  const classes = useStyles();
  console.log('domain: ', domain);
  const {
    name,
  } = domain;
  return (
    <Card>
      <CardContent>
        <Typography>{name}</Typography>
      </CardContent>
      <CardActions className={classes.root}>
        <Button variant="contained" size="small" onClick={() => history.push('/app/manage-company-domain', {domain, company})}>Edit</Button>
      </CardActions>
    </Card>
  );
};