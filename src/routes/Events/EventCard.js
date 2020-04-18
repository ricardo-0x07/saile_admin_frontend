import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";


export const EventCard = ({ event }) => {
  const {
    sender,
    subject,
    label,
  } = event;
  return (
    <Card>
      <CardContent>
        <Typography>{label}</Typography>
        <Typography>{sender}</Typography>
        <Typography>{subject}</Typography>
      </CardContent>
    </Card>
  );
};