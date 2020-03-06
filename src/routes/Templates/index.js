import * as React from "react";
import { Query } from "react-apollo";

import { TemplateCard } from "./TemplateCard";
import { listTemplates } from "../../graphql/queries";
import Title from '../../components/Title';



const Templates = (props) => {
  console.log('props: ', props);
  return (
    <Query
      query={listTemplates(10)}
    >
      {({ data, loading }) => {
        console.log('data: ', data);
        if (
          loading ||
          !data ||
          !data.template ||
          !data.template
        ) {
          return null;
        }

        console.log(data.template);

        return (
          <div>
            <Title>Templates</Title>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gridGap: 10
              }}
            >
              
              {
                props.location.state && props.location.state.campaign  && props.location.state.campaign ?
                data.template.filter(item => item.campaign_id === props.location.state.campaign.id ).map(x => (
                  <TemplateCard template={x} name={x.name} key={x.id} history={props.history}/>
                ))
                :
                data.template.filter(item => item ).map(x => (
                  <TemplateCard template={x} name={x.name} key={x.id}  history={props.history} />
                ))
              }
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default Templates