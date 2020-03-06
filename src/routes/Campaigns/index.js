import * as React from "react";
import { Query } from "react-apollo";

import { CampaignCard } from "./CampaignCard";
import { listCampaigns } from "../../graphql/queries";
import Title from '../../components/Title';



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
          <div>
            <Title>Campaigns</Title>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(1, 1fr)",
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