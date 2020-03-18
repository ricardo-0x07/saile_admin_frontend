import * as React from "react";
import { Query } from "react-apollo";

import { TemplateCard } from "./TemplateCard";
import { listTemplates } from "../../graphql/queries";
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




const Templates = (props) => {
  const classes = useStyles();
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
          <div className={classes.root}>
            <Title>Templates</Title>
            <Button variant="contained" size="small" onClick={() => props.history.push('/manage-template', {campaign: props.location.state.campaign})}>Add Template</Button>
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