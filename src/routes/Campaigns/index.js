import * as React from "react";
import { Query } from "react-apollo";

import { CampaignCard } from "./CampaignCard";
import { listCampaigns, listRequirementCampaigns } from "../../graphql/queries";
import Title from '../../components/Title';
import Button from "@material-ui/core/Button";
import { adopt } from 'react-adopt';
import { makeStyles } from '@material-ui/core/styles';
// import CampaignPlusAccountsCSVReader from '../../components/CampaignPlusAccountsCSVReader'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

// const accounts_csv_key_map = {
//   campaign_name: 'Campaign Name',
//   status: 'Status',
//   industry: 'Account: Vertical',
//   name: 'Account: Account Name',
//   address: 'Account: Billing Street',
//   street: 'Account: Billing Street',
//   employees: 'Account: Employees',
//   phone: 'Account: Main Phone',
//   revenue: 'Account: Revenue ($mil)',
//   state  : 'Account: Billing State/Province',
//   website  : 'Account: Website',
//   email_domain: 'Account: Email Domain',
//   NAICS: 'Account: Primary US NAICS Code',
//   city: 'Account: Billing City',
//   country: 'Account: Billing Country',
//   ex_id: 'Account: Account ID',
//   d_u_n_s_number: 'Account: D-U-N-S® Number',
//   postal_code: 'Account: Postal Code',
// };

// const contacts_csv_key_map = {
//   campaign_name: 'Campaign Name',
//   bounce_type: '',
//   email: 'Email',
//   firstname: 'First Name',
//   gender: 'Gender',
//   is_ema_eligible: 'EMA Eligible?',
//   is_eva_eligible: 'EVA Eligible?',
//   lastname: 'Last Name',
//   member_status: 'Member Status',
//   phone: '',
//   position: '',
//   role: 'Role',
//   sam_status: '',
//   source: '',
//   title: 'Title',
//   ex_id: 'Contact ID',
//   ex_account_id: 'Account ID',
//   ex_member_id: 'Member ID',
//   linkedin: 'LinkedIn URL',
//   city: 'Billing City',
//   state: 'Billing State/Province',
//   country: 'Billing Country',
  
// };


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
            <Title>{props.location.state && props.location.state.requirement ? props.location.state.requirement.name : ''} Campaigns</Title>
            <Button variant="contained" size="small" onClick={() => props.history.push('/app/manage-campaign', {requirement: props.location.state.requirement})}>Add Campaign</Button>
            {
              // props.location.state && props.location.state.requirement && props.location.state.requirement.id && 
              // <>
              //   {/* <ContactsCSVReader location={props.location} contacts_csv_key_map={contacts_csv_key_map} requirement_id={props.location.state.requirement.id} label={'Contacts'} sailebot={props.location.state.sailebot}/> */}
              //   <CampaignPlusAccountsCSVReader location={props.location} accounts_csv_key_map={accounts_csv_key_map} requirement_id={props.location.state.requirement.id} label={'Campaigns + Accounts'} sailebot={props.location.state.sailebot}/>
              // </>
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