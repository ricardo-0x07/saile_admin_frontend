import * as React from "react";
import { Query } from "react-apollo";

import { CampaignCard } from "./CampaignCard";
import { listCampaigns, listRequirementCampaigns } from "../../graphql/queries";
import Title from '../../components/Title';
import Button from "@material-ui/core/Button";
import { adopt } from 'react-adopt';
import { makeStyles } from '@material-ui/core/styles';
import CampaignPlusAccountsCSVReader from '../../components/CampaignPlusAccountsCSVReader'
import CampaignPlusAccountsCSVReaderLegacy from '../../components/CampaignPlusAccountsCSVReaderLegacy'
import CampaignPlusContactsCSVReader from '../../components/CampaignPlusContactsCSVReader'
import CampaignPlusContactsCSVReaderLegacy from '../../components/CampaignPlusContactsCSVReaderLegacy'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const accounts_csv_key_map = {
  campaign_name: 'Campaign Name',

  status: 'Status',

  industry: 'Industry',

  name: 'Company Name for Emails',

  address: 'Company Address',

  street: 'Company Address',

  employees: '# Employees',

  phone: 'Corporate Phone',

  revenue: 'Annual Revenue',

  state  : 'Company State',

  website  : 'Website',

  email_domain: 'Account: Email Domain',

  NAICS: 'Account: Primary US NAICS Code',

  city: 'Company City',

  country: 'Company Country',

  // ex_id: 'Account: Account ID',
  d_u_n_s_number: 'Account: D-U-N-S® Number',

  postal_code: 'Company Postal Code',
};

const contacts_csv_key_map = {
  campaign_name: 'Campaign Name',

  name: 'Company Name for Emails',
  email_domain: 'Account: Email Domain',

  firstname: 'First Name',
  lastname: 'Last Name',
  email: 'Email',
  title: 'Title',
  gender: 'Gender',
  source: 'Source',
  linkedin: 'Person Linkedin Url',
  phone: 'First Phone',
  city:'City',
  state:'State',
  country:'Country',
  industry: 'Industry',
  status: 'Status',
  delisted_date: 'Remove/Optout Date',
};


const Campaigns = (props) => {
  console.log("Campaigns props: ", props)
  const classes = useStyles();
  const Composed = adopt({
    campaignsSubscription: props.location.state && props.location.state.requirement && props.location.state.requirement.id ?
    ({ render }) => (
      <Query query={listRequirementCampaigns(props.location.state.requirement.id)} >
        { render }
      </Query>
    )
    :
    ({ render }) => (
      <Query query={listCampaigns(10) } >
        { render }
      </Query>
    ),
  })
  return (
    <Composed>
      {({ campaignsSubscription: {data, loading} }) => {
        if (
          loading ||
          !data ||
          !data.campaign ||
          !data.campaign
        ) {
          return null;
        }


        return (
          <div className={classes.root}>
            <Title>{props.location.state && props.location.state.sailebot ? `${props.location.state.sailebot.fullname} @ ${props.location.state.sailebot.email}`: ''}</Title>
            {/* <Title>{props.location.state && props.location.state.requirement ? props.location.state.requirement.name : ''} Campaigns</Title> */}
            <Button variant="contained" size="small" onClick={() => props.history.push('/app/manage-campaign', {requirement: props.location.state.requirement, sailebot: props.location.state.sailebot})}>Add Campaign</Button>
            {
              props.location.state && props.location.state.requirement && props.location.state.requirement.id && 
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <CampaignPlusAccountsCSVReaderLegacy location={props.location} accounts_csv_key_map={accounts_csv_key_map} requirement_id={props.location.state.requirement.id} label={'LEGACY Campaign Accounts'} sailebot={props.location.state.sailebot}/>
                <CampaignPlusContactsCSVReaderLegacy location={props.location} contacts_csv_key_map={contacts_csv_key_map} requirement_id={props.location.state.requirement.id} label={'LEGACY Campaign Contacts'} sailebot={props.location.state.sailebot}/>
                <CampaignPlusAccountsCSVReader location={props.location} accounts_csv_key_map={accounts_csv_key_map} requirement_id={props.location.state.requirement.id} label={'New Campaign Accounts'} sailebot={props.location.state.sailebot}/>
                <CampaignPlusContactsCSVReader location={props.location} contacts_csv_key_map={contacts_csv_key_map} requirement_id={props.location.state.requirement.id} label={'New Campaign Contacts'} sailebot={props.location.state.sailebot}/>
              </div>
            }
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(1, 1fr)",
                gridGap: 10
              }}
            >
              {
                props.location.state && props.location.state.requirement ?
                data.campaign.filter(item => item.requirement_id === props.location.state.requirement.id ).map(x => (
                  <CampaignCard campaign={x} name={x.name} key={x.id} history={props.history} requirement={props.location.state.requirement} sailebot={props.location.state.sailebot} client={props.location.state.client} comapny={props.location.state.comapny}/>
                ))
                :
                data.campaign.filter(item => item ).map(x => (
                  <CampaignCard campaign={x} name={x.name} key={x.id}  history={props.history} />
                ))
              }
            </div>
            
          </div>
        );
      }}
    </Composed>
  );
};

export default Campaigns