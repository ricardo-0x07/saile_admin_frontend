import * as React from "react";
import { Query } from "react-apollo";

import { RequirementCard } from "./RequirementCard";
import { listRequirements, listSailebotRequirements } from "../../graphql/queries";
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




const Requirements = (props) => {
  const classes = useStyles();
  const Composed = adopt({
    requirementsQuery: props.location.state && props.location.state.sailebot && props.location.state.sailebot.id ?
    ({ render }) => (
      <Query query={listSailebotRequirements(props.location.state.sailebot.id)} >
        { render }
      </Query>
    )
    :
    ({ render }) => (
      <Query query={listRequirements(10) } >
        { render }
      </Query>
    ),
  })
  return (
    <Composed>
      {({ requirementsQuery: { data, loading } }) => {
        if (
          loading ||
          !data ||
          !data.requirement ||
          !data.requirement
        ) {
          return null;
        }

        console.log('data: ', data)
        return (
          <div className={classes.root}>
            <Title>{props.location.state && props.location.state.sailebot  && props.location.state.sailebot ? props.location.state.sailebot.fullname : '' } Requirements</Title>
            <Button variant="contained" size="small" onClick={() => props.history.push('/app/manage-requirement', {sailebot: props.location.state.sailebot})}>Add Requirement</Button>
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
                  <RequirementCard requirement={x} name={x.fullname} key={x.id} history={props.history} sailebot={props.location.state.sailebot}/>
                ))
                :
                data.requirement.filter(item => item ).map(x => (
                  <RequirementCard requirement={x} name={x.fullname} key={x.id}  history={props.history} />
                ))
              }
            </div>
          </div>
        );
      }}
    </Composed>
  );
};

export default Requirements