import * as React from "react";
import { Subscription } from "react-apollo";

import { TemplateCard } from "./TemplateCard";
import { listTemplates, listCampaignTemplates } from "../../graphql/subscription";
import Title from '../../components/Title';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import { adopt } from 'react-adopt';
// import { Subscription } from "urql";
const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));




const Templates = (props) => {
  console.log('Templates props: ', props)
  const classes = useStyles();
  const Composed = adopt({
    templatesQuery: props.location.state && props.location.state.campaign && props.location.state.campaign.id ?
    ({ render }) => (
      <Subscription subscription={listCampaignTemplates(props.location.state.campaign.id)} >
        { render }
      </Subscription>
    )
    :
    ({ render }) => (
      <Subscription subscription={listTemplates(10) } >
        { render }
      </Subscription>
    ),
  })
  return (
    <Composed>
      {({ templatesQuery: { data, loading} }) => {
        console.log('Templates loading: ', loading)
        console.log('Templates data: ', data)
        if (
          loading ||
          !data ||
          !data.template ||
          !data.template
        ) {
          return null;
        }


        return (
          <div className={classes.root}>
            <Title>Content</Title>
            <Button variant="contained" size="small" onClick={() => props.history.push('/app/manage-template', {campaign: props.location.state.campaign})}>Add Template</Button>
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
                  <TemplateCard template={x} name={x.name} key={x.id} history={props.history} campaign={props.location.state.campaign}/>
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
    </Composed>
  );
};

export default Templates