import * as React from "react";
import { Query } from "react-apollo";
import { connect } from 'react-redux';
import { CompanyCard } from "./CompanyCard";
import { listCompanies } from "../../graphql/queries";
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



const Companies = (props) => {
  const classes = useStyles();

  
  return (
    <Query
    query={listCompanies(100)}
    >
      {({ data, loading, refetch }) => {
        console.log('props: ', props)
        console.log('data: ', data)
        console.log('loading: ', loading)
        if (
          loading ||
          !data ||
          !data.company ||
          !data.company
        ) {
          return null;
        }


        return (
          <div className={classes.root}>
            <Title>Companies</Title>
            <Button variant="contained" size="small" onClick={() => props.history.push('/app/manage-company')}>Add Company</Button>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gridGap: 10
              }}
            >
              {
                data.company.filter(item => item ).map(x => (
                  <CompanyCard refetch={refetch} company={x} name={x.name} key={x.id}  history={props.history}/>
                ))
              }
            </div>
          </div>
        );
      }}
    </Query>
  );
};

// export default Companies

export default connect(
  state => ({
    admin: state.admin,
    routing: state.routing
  })
)(Companies);
