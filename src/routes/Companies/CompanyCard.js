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

export const CompanyCard = ({ company, history }: Props) => {
  const { name, address, id } = company;
  return (
    <Card>
      <CardContent>
        <Typography>{name}</Typography>
        <Typography>{address}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => history.push('/app/manage-company', {company})}>Edit</Button>
        <Button size="small" onClick={() => history.push('/app/manage-client', {company})}>Add Client</Button>
        <Button size="small" onClick={() => history.push('/app/clients-by-company', {company})}>View Clients</Button>
      </CardActions>
    </Card>
  );
};