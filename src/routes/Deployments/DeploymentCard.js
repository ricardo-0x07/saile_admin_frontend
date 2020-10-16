import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { adopt } from 'react-adopt';
import { Query } from "react-apollo";
import { getCampaign } from "../../graphql/queries";
import { describeService, updateService } from '../../utils/rest_api'

import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import * as moment from 'moment';
// var moment_timezone = require('moment-timezone');
// import 'moment-timezone/builds/moment-timezone-with-data';
// import 'moment-timezone';


const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export const DeploymentCard = ({ service,  history }) => {
  const classes = useStyles();
  const { campaign_id } = service;

  const [state, setState] = React.useState({
    service_data: {},
    showDownload: false,
  });

  const getService = async () => {
    let services = await describeService({ campaign_id });
    services = await services.json()
    console.log("services: ", services);
    return "services" in services && services["services"].length > 0  ? services["services"][0] : {}
  }
  React.useEffect(() => {
    const getData = async () => {
      const resp = await getService();
      // const json = await resp.json()
      setState({ ...state, service_data: resp });
    }
    getData();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps
  
  const {service_data } = state;
  console.log('service_data: ', service_data);
  const runECSService = async (params) => {
    await updateService(params);
    let services = await describeService({ campaign_id });
    services = await services.json()
    setState({ ...state, service_data: "services" in services && services["services"].length > 0  ? services["services"][0] : {} });
  }
  const Composed = adopt({
    getCampaignQuery: ({ render }) => (
      <Query query={getCampaign(campaign_id)} >
        { render }
      </Query>
    )
  })

  return (
    <Composed>
      {({ getCampaignQuery }) => {
        console.log("getCampaignQuery: ", getCampaignQuery);
        console.log("getCampaignQuery.data: ", getCampaignQuery.data);
        console.log("getCampaignQuery.loading: ", getCampaignQuery.loading);
        let tzTime = null;
        if(getCampaignQuery && getCampaignQuery.data &&  getCampaignQuery.data.campaign && getCampaignQuery.data.campaign[0]["timezone"] !== undefined) {
          console.log("getCampaignQuery.data.campaign[0][timezone] !== undefined: ", getCampaignQuery.data.campaign[0]["timezone"] !== undefined)
          
          const timezone = getCampaignQuery.data.campaign[0]["timezone"]
          console.log("timezone: ", timezone);
          tzTime = new Date().toLocaleString("en-US", {timeZone: timezone});
          let start = new Date().toLocaleString("en-US", {timeZone: 'US/Eastern'});
          start = moment().set("hour", 5).set("minute", 0);
          console.log("start: ", start);
          tzTime = moment(tzTime)
          console.log("tzTime: ", tzTime);
          console.log("tzTime > start: ", tzTime > start);
          console.log('AEST time: '+ (new Date(tzTime)).toISOString())
        }
        return (
          <Card>
            <CardContent>
              <Typography>CampaignId: {campaign_id}</Typography>
              {/* <Typography>Desired Status: {desiredStatus}</Typography> */}
              {/* <Typography>Last Status: {lastStatus}</Typography> */}
              {/* <Typography>Launch Type: {launchType}</Typography> */}
              {/* <Typography>Memory: {memory}</Typography> */}
              {/* <Typography>CPU: {cpu}</Typography> */}
              {
                getCampaignQuery.data && !getCampaignQuery.loading && getCampaignQuery.data.campaign.length > 0 &&
                <React.Fragment>
                  <Typography>Name: {getCampaignQuery.data.campaign[0]["name"] !== undefined ? getCampaignQuery.data.campaign[0]["name"] : ''}</Typography>
                  <Typography>Email: {getCampaignQuery.data.campaign[0]["smtp_login"] !== undefined ? getCampaignQuery.data.campaign[0]["smtp_login"] : ''}</Typography>
                  <Typography>Timezone: {getCampaignQuery.data.campaign[0]["timezone"] !== undefined ? getCampaignQuery.data.campaign[0]["timezone"] : ''}</Typography>
                  <Typography>
                    {/* <strong>Time Now:</strong> <Moment date={new Date()} format="hh:mm:ss" tz="America/Los_Angeles"></Moment> */}
                    <strong>Time Now:</strong> <Moment date={tzTime} format="HH:mm:ss" ></Moment>
                  </Typography>
                  {/* <Typography>Name: {getCampaignQuery.data.campaign[0]["name"] !== undefined ? getCampaignQuery.data.campaign[0]["name"] : ''}</Typography> */}
                </React.Fragment>
              }
              {
                Object.keys(service_data).length > 0 &&
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Typography >ECS Service: {"serviceName" in service_data ? service_data["serviceName"] : ""}</Typography>
                  <Typography >Status: {"status" in service_data ? service_data["status"] : ""}</Typography>
                  <Typography >Desired Count: {"desiredCount" in service_data ? service_data["desiredCount"] : ""}</Typography>
                  <Typography >Pending Count: {"pendingCount" in service_data ? service_data["pendingCount"] : ""}</Typography>
                  <Typography >Running Count: {"runningCount" in service_data ? service_data["runningCount"] : ""}</Typography>
                </div>
              }
            </CardContent>
            <div style={{ display: 'flex', flexDirection: 'row' }} className={classes.root}>
              <CardActions style={{ display: 'flex', flexDirection: 'column' }} className={classes.root}>
                {
                  Object.keys(service_data).length > 0 && "desiredCount" in service_data &&
                  <React.Fragment>
                    {
                      service_data["desiredCount"] > 0 
                      ?
                      <Button variant="contained" color="secondary"  style={{ width: '100%', marginBottom: '1rem'}} size="small" onClick={() => runECSService({campaign_id, desiredCount: 0})}>Stop ECS Service</Button>
                      :
                      <Button variant="contained" color="default"   style={{ width: '100%', marginBottom: '1rem'}} size="small" onClick={() => runECSService({campaign_id, desiredCount: 1})}>Run ECS Service</Button>
  
                    }
                  </React.Fragment>
                }
              </CardActions>
              {/* <CardActions style={{ display: 'flex', flexDirection: 'column' }} className={classes.root}>
                {
                  // companyEventCountQuery.data && 
                  // companyEventCountQuery.data.event_aggregate &&
                  // companyEventCountQuery.data.event_aggregate.aggregate &&
                  // <Button  variant="contained" size="small" style={{ width: '100%'}} onClick={() => history.push('/app/events-by-service', {service, events: companyEventCountQuery.data.event_aggregate.nodes })}>Digital Labor: <br/> {companyEventCountQuery.data.event_aggregate.aggregate.count}</Button>
                }
                {
                  // referralEventCountQuery.data && 
                  // referralEventCountQuery.data.event_aggregate &&
                  // referralEventCountQuery.data.event_aggregate.aggregate &&
                  // <Button  variant="contained" size="small" style={{ width: '100%'}} onClick={() => history.push('/app/events-by-company', {company, events: referralEventCountQuery.data.event_aggregate.nodes })}>Referral Events: <br/> {referralEventCountQuery.data.event_aggregate.aggregate.count}</Button>
                }
                {
                  // actionableEventCountQuery.data && 
                  // actionableEventCountQuery.data.event_aggregate &&
                  // actionableEventCountQuery.data.event_aggregate.aggregate &&
                  // <Button  variant="contained" size="small" style={{ width: '100%'}} onClick={() => history.push('/app/events-by-company', {company, events: actionableEventCountQuery.data.event_aggregate.nodes })}>Actionable Events: <br/> {actionableEventCountQuery.data.event_aggregate.aggregate.count}</Button>
                }
              </CardActions> */}
            </div>
          </Card>
        );
      }}
    </Composed>
  );
};