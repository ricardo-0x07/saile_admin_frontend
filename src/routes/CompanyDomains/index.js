import * as React from "react";
import { Subscription } from "react-apollo";
import { adopt } from 'react-adopt';

import { DomainCard } from "./DomainCard";
import { listCompanyDomains, listCompanyDomainsByCompanyId } from "../../graphql/subscription";
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
  const Composed = adopt({
    listCompanyDomainsQuery: props.location.state && props.location.state.company && props.location.state.company.id ?
    ({ render }) => (
      <Subscription subscription={listCompanyDomainsByCompanyId(props.location.state.company.id)} >
        { render }
      </Subscription>
    )
    :
    ({ render }) => (
      <Subscription subscription={listCompanyDomains(10) } >
        { render }
      </Subscription>
    ),
  })
  return (
    <Composed>
      {({ listCompanyDomainsQuery: {data, loading} }) => {
        console.log('loading: ', loading)
        console.log('data: ', data)
        console.log('props.location.state: ', props.location.state)
        if (
          loading ||
          !data ||
          !data.company_domain ||
          !data.company_domain
        ) {
          return null;
        }


        return (
          <div className={classes.root}>
            <Title>Domains</Title>
            <Button variant="contained" size="small" onClick={() => props.history.push('/app/manage-company-domain', {company: props.location.state.company})}>Add Domain</Button>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gridGap: 10
              }}
            >
              {
                props.location.state && props.location.state.company  && props.location.state.company ?
                data.company_domain.filter(item => item.company_id === props.location.state.company.id ).map(x => (
                  <DomainCard domain={x} name={x.name} key={x.id} history={props.history} company={props.location.state.company}/>
                ))
                :
                data.company_domain.filter(item => item ).map(x => (
                  <DomainCard domain={x} key={x.id}  history={props.history} />
                ))
              }
            </div>
          </div>
        );
      }}
    </Composed>
  );
};

export default Domains