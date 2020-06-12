import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
  FormControlLabel,
} from '@material-ui/core';
import { adopt } from 'react-adopt';
import { Mutation } from "react-apollo";
import Switch from '@material-ui/core/Switch';
import { updateCampaign } from "../../graphql/mutations";


export const CampaignCard = ({ campaign, sailebot, requirement,  history }) => {
  console.log('campaign: ', campaign)
  const [state, setState] = React.useState({
    toStatus: campaign.to_run,
  });
  const Composed = adopt({
    updateCampaignMutation: ({ render }) => (
        <Mutation mutation={ updateCampaign } >
          { render }
        </Mutation> 
    ),
  })

  const handleChange = (updateCampaignMutation) => async (event) => {
    const { name, description, accounts_per_schedule, requirement_id, id } = campaign;
    console.log('event.target.name: ', event.target.name)
    console.log('event.target.value: ', event.target.value)
    console.log('event.target.checked: ', event.target.checked)
    const to_run = event.target.checked
    await setState({ ...state, [event.target.name]: to_run });
    console.log('to_run: ', to_run)
    console.log('state: ', state)
    // updateCampaignMutation
    await updateCampaignMutation({
      variables: {
          objects: {
              id,
              name,
              description,
              accounts_per_schedule,
              requirement_id,
              to_run,
          },
          id
      }
  });

  };
  const { name, accounts_per_schedule } = campaign;
  return (
    <Composed>
      {({ updateCampaignMutation }) => {
        return (
          <Card>
            <CardContent>
              <Typography>Name: {name}</Typography>
              <Typography>Accounts per schedule: {accounts_per_schedule}</Typography>
            </CardContent>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <CardActions style={{ display: 'flex', flexDirection: 'column' }}>
                <Button size="small" onClick={() => history.push('/app/manage-campaign', {campaign, requirement})}>Edit</Button>
                <Button size="small" onClick={() => history.push('/app/manage-template', {campaign})}>Add Template</Button>
                <Button size="small" onClick={() => history.push('/app/manage-schedule', {campaign})}>Add Schedule</Button>
                <Button size="small" onClick={() => history.push('/app/manage-account', {campaign})}>Add Account</Button>
              </CardActions>
              <CardActions style={{ display: 'flex', flexDirection: 'column' }}>
                <Button size="small" onClick={() => history.push('/app/templates-by-campaign', {campaign})}>View Templates</Button>
                <Button size="small" onClick={() => history.push('/app/schedules-by-campaign', {campaign, sailebot})}>View Schedules</Button>
                <Button size="small" onClick={() => history.push('/app/accounts-by-campaign', {campaign, sailebot})}>View Accounts</Button>
                <Button size="small" onClick={() => history.push('/app/clarifications-by-campaign', {campaign, sailebot})}>Clarifications</Button>
                <FormControlLabel
                  control={
                    <Switch
                      checked={state.toStatus}
                      onChange={handleChange(updateCampaignMutation)}
                      name="toStatus"
                      color="primary"
                    />
                  }
                  label="Run?"
                />
              </CardActions>
            </div>
          </Card>
        );
      }}
    </Composed>
  );
};