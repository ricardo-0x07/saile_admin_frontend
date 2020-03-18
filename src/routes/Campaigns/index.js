import * as React from "react";
import { Query } from "react-apollo";

import { CampaignCard } from "./CampaignCard";
import { listCampaigns } from "../../graphql/queries";
import Title from '../../components/Title';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));



const Campaigns = (props) => {
  const classes = useStyles();
  console.log('props: ', props);
  return (
    <Query
      query={listCampaigns(10)}
      // variables={{ limit: 10 }}
    >
      {({ data, loading }) => {
        console.log('data: ', data);
        if (
          loading ||
          !data ||
          !data.campaign ||
          !data.campaign
        ) {
          return null;
        }

        console.log(data.campaign);

        return (
          <div className={classes.root}>
            <Title>{props.location.state && props.location.state.requirement ? props.location.state.requirement.name : ''} Campaigns</Title>
            <Button variant="contained" size="small" onClick={() => props.history.push('/manage-campaign', {requirement: props.location.state.requirement})}>Add Campaign</Button>
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
                  <CampaignCard campaign={x} name={x.name} key={x.id} history={props.history}/>
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
    </Query>
  );
};

export default Campaigns