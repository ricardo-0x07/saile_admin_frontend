import * as React from "react";
import { Query } from "react-apollo";

import { RequirementCard } from "./RequirementCard";
import { listRequirements } from "../../graphql/queries";
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




const Requirements = (props) => {
  const classes = useStyles();
  console.log('props: ', props);
  return (
    <Query
      query={listRequirements(10)}
    >
      {({ data, loading }) => {
        console.log('data: ', data);
        if (
          loading ||
          !data ||
          !data.requirement ||
          !data.requirement
        ) {
          return null;
        }

        console.log(data.requirement);

        return (
          <div className={classes.root}>
            <Title>{props.location.state && props.location.state.sailebot  && props.location.state.sailebot ? props.location.state.sailebot.name : '' } Requirements</Title>
            <Button variant="contained" size="small" onClick={() => props.history.push('/manage-requirement', {sailebot: props.location.state.sailebot})}>Add Requirement</Button>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gridGap: 10
              }}
            >
              
              {
                props.location.state && props.location.state.sailebot  && props.location.state.sailebot ?
                data.requirement.filter(item => item.sailebot_id === props.location.state.sailebot.id ).map(x => (
                  <RequirementCard requirement={x} name={x.name} key={x.id} history={props.history}/>
                ))
                :
                data.requirement.filter(item => item ).map(x => (
                  <RequirementCard requirement={x} name={x.name} key={x.id}  history={props.history} />
                ))
              }
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default Requirements