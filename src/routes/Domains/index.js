import * as React from "react";
import { Query } from "react-apollo";

import { DomainCard } from "./DomainCard";
import { listDomains } from "../../graphql/queries";
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



const Domains = (props) => {
  const classes = useStyles();
  console.log('props: ', props);
  return (
    <Query
      query={listDomains(10)}
    >
      {({ data, loading }) => {
        console.log('data: ', data);
        if (
          loading ||
          !data ||
          !data.domain ||
          !data.domain
        ) {
          return null;
        }

        console.log(data.domain);

        return (
          <div className={classes.root}>
            <Title>Domains</Title>
            <Button variant="contained" size="small" onClick={() => props.history.push('/manage-domain', {sailebot: props.location.state.sailebot})}>Add Domain</Button>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gridGap: 10
              }}
            >
              {
                props.location.state && props.location.state.sailebot  && props.location.state.sailebot ?
                data.domain.filter(item => item.sailebot_id === props.location.state.sailebot.id ).map(x => (
                  <DomainCard domain={x} name={x.name} key={x.id} history={props.history}/>
                ))
                :
                data.domain.filter(item => item ).map(x => (
                  <DomainCard domain={x} key={x.id}  history={props.history} />
                ))
              }
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default Domains