import * as React from "react";
import { Subscription } from "react-apollo";

import { CampaignCard } from "./CampaignCard";
import { listCampaigns, listRequirementCampaigns } from "../../graphql/subscription";
import Title from '../../components/Title';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import { adopt } from 'react-adopt';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));



const Campaigns = (props) => {
  const classes = useStyles();
  const Composed = adopt({
    campaignsSubscription: props.location.state && props.location.state.requirement && props.location.state.requirement.id ?
    ({ render }) => (
      <Subscription subscription={listRequirementCampaigns(props.location.state.requirement.id)} >
        { render }
      </Subscription>
    )
    :
    ({ render }) => (
      <Subscription subscription={listCampaigns(10) } >
        { render }
      </Subscription>
    ),
  })
  return (
    <Composed>
      {({ campaignsSubscription: {data, loading} }) => {
        if (
          loading ||
          !data ||
          !data.campaign ||
          !data.campaign
        ) {
          return null;
        }


        return (
          <div className={classes.root}>
            <Title>{props.location.state && props.location.state.requirement ? props.location.state.requirement.name : ''} Campaigns</Title>
            <Button variant="contained" size="small" onClick={() => props.history.push('/app/manage-campaign', {requirement: props.location.state.requirement})}>Add Campaign</Button>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gridGap: 10
              }}
            >
              {
                props.location.state && props.location.state.requirement ?
                data.campaign.filter(item => item.requirement_id === props.location.state.requirement.id ).map(x => (
                  <CampaignCard campaign={x} name={x.name} key={x.id} history={props.history} requirement={props.location.state.requirement}/>
                ))
                :
                data.campaign.filter(item => item ).map(x => (
                  <CampaignCard campaign={x} name={x.name} key={x.id}  history={props.history} />
                ))
              }
            </div>
          </div>
        );
      }}
    </Composed>
  );
};

export default Campaigns