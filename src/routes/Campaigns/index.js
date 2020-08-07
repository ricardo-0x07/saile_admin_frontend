import * as React from "react";
import { Query } from "react-apollo";

import { CampaignCard } from "./CampaignCard";
import { listCampaigns, listRequirementCampaigns } from "../../graphql/queries";
import Title from '../../components/Title';
import Button from "@material-ui/core/Button";
import { adopt } from 'react-adopt';
import { makeStyles } from '@material-ui/core/styles';
import CampaignPlusAccountsCSVReader from '../../components/CampaignPlusAccountsCSVReader'
import CampaignPlusContactsCSVReader from '../../components/CampaignPlusContactsCSVReader'

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
  industry: 'Account: Vertical',
  name: 'Account: Account Name',
  address: 'Account: Billing Street',
  street: 'Account: Billing Street',
  employees: 'Account: Employees',
  phone: 'Account: Main Phone',
  revenue: 'Account: Revenue ($mil)',
  state  : 'Account: Billing State/Province',
  website  : 'Account: Website',
  email_domain: 'Account: Email Domain',
  NAICS: 'Account: Primary US NAICS Code',
  city: 'Account: Billing City',
  country: 'Account: Billing Country',
  // ex_id: 'Account: Account ID',
  d_u_n_s_number: 'Account: D-U-N-S® Number',
  postal_code: 'Account: Postal Code',
};

const contacts_csv_key_map = {
  campaign_name: 'Campaign Name',

  name: 'Account Name',
  email_domain: 'Account: Email Domain',

  firstname: 'First Name',
  lastname: 'Last Name',
  email: 'Contact Email',
  title: 'Title',
  gender: 'Gender',

  status: 'Member Status',
  delisted_date: 'Remove/Optout Date',
};


const Campaigns = (props) => {
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
            <Title>{props.location.state && props.location.state.requirement ? props.location.state.requirement.name : ''} Campaigns</Title>
            <Button variant="contained" size="small" onClick={() => props.history.push('/app/manage-campaign', {requirement: props.location.state.requirement, sailebot: props.location.state.sailebot})}>Add Campaign</Button>
            {
              props.location.state && props.location.state.requirement && props.location.state.requirement.id && 
              <>
                <CampaignPlusContactsCSVReader location={props.location} contacts_csv_key_map={contacts_csv_key_map} requirement_id={props.location.state.requirement.id} label={'LEGACY Campaigns + Contacts'} sailebot={props.location.state.sailebot}/>
                <CampaignPlusAccountsCSVReader location={props.location} accounts_csv_key_map={accounts_csv_key_map} requirement_id={props.location.state.requirement.id} label={'LEGACY Campaigns + Accounts'} sailebot={props.location.state.sailebot}/>
              </>
            }
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gridGap: 10
              }}
            >
              {
                props.location.state && props.location.state.requirement ?
                data.campaign.filter(item => item.requirement_id === props.location.state.requirement.id ).map(x => (
                  <CampaignCard campaign={x} name={x.name} key={x.id} history={props.history} requirement={props.location.state.requirement} sailebot={props.location.state.sailebot}/>
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