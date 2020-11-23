import * as React from "react";
import { connect } from 'react-redux';
import { DeploymentCard } from "./DeploymentCard";
import Title from '../../components/Title';
// import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import { getECSServicesCampaignIds, getCampaignECSDeployments } from '../../utils/rest_api'

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
  const _getCampaignECSDeployments_ = async () => {
    let campaignECSDeployments = await getCampaignECSDeployments();
    campaignECSDeployments = await campaignECSDeployments.json()
    console.log("campaignECSDeployments: ", campaignECSDeployments);
    return campaignECSDeployments
  }
  React.useEffect(() => {
    const getData = async () => {
      let shallow_resp = await getTasks();
      let task_details_response = await _getCampaignECSDeployments_();
      task_details_response = task_details_response.reduce((acc, value) => {
        const { campaign_id } = value;
        return {...acc, [campaign_id]: value}
      }, {})
      console.log("task_details_response: ", task_details_response);
      const services = shallow_resp['services'].map(camp => {
        const { campaign_id } = camp;
        return {
          campaign_id,
          memory: task_details_response[campaign_id] ? task_details_response[campaign_id]['memory'] : '',
          cpu: task_details_response[campaign_id] ? task_details_response[campaign_id]['cpu'] : ''
        }
      })
      shallow_resp['services'] = services
      console.log("shallow_resp: ", shallow_resp);
      // const json = await resp.json()
      setState({ ...state, data: shallow_resp });
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
            <DeploymentCard service={x} key={x.campaign_id}  campaign_id={x.campaign_id}  memory={x.memory}  cpu={x.cpu}  history={props.history}/>
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
