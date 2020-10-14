import * as React from "react";
import { connect } from 'react-redux';
import { DeploymentCard } from "./DeploymentCard";
import Title from '../../components/Title';
// import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import { getECSServicesCampaignIds } from '../../utils/rest_api'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));



const Companies = (props) => {
  const classes = useStyles();
  console.log("props: ", props);
  const [state, setState] = React.useState({
    data: [],
    showDownload: false,
  });


  const getTasks = async () => {
    let tasks = await getECSServicesCampaignIds();
    tasks = await tasks.json()
    console.log("tasks: ", tasks);
    return tasks
  }
  React.useEffect(() => {
    const getData = async () => {
      const resp = await getTasks();
      // const json = await resp.json()
      setState({ ...state, data: resp });
    }
    getData();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps
  const { data } = state;
  console.log('data: ', data);
  
  return (
    <div className={classes.root}>
      <Title>Deployments</Title>
      
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridGap: 10
        }}
      >
        {
          data && "services" in data &&
          data["services"].filter(item => item ).map(x => (
            <DeploymentCard service={x} key={x.campaign_id}  campaign_id={x.campaign_id}  history={props.history}/>
          ))
        }
      </div>
    </div>
  );
};

// export default Companies

export default connect(
  state => ({
    admin: state.admin,
    routing: state.routing
  })
)(Companies);
