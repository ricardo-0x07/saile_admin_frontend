import * as React from "react";
import { Query } from "react-apollo";

import { CampaignCard } from "./CampaignCard";
import { listCampaigns } from "../../graphql/queries";


const Campaigns = (props) => {
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
          <div
            style={{
              display: "grid",
              gridCampaignColumns: "repeat(4, 1fr)",
              gridGap: 10
            }}
          >
            {
              props.location.state && props.location.state.requirement ?
              data.campaign.filter(item => item.requirement_id === props.location.state.requirement.id ).map(x => (
                <CampaignCard requirement={props.location.state.requirement} campaign={x} name={x.name} key={x.id} history={props.history}/>
              ))
              :
              data.campaign.filter(item => item ).map(x => (
                <CampaignCard requirement={props.location.state.requirement} campaign={x} name={x.name} key={x.id}  history={props.history} />
              ))
            }
          </div>
        );
      }}
    </Query>
  );
};

export default Campaigns