
import React from 'react';

import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Container } from 'react-bootstrap'

import ManageCampaign from './ManageCampaign'
import ManageCompany from './ManageCompany'
import ManageClient from './ManageClient'
import ManageSaileBot from './ManageSaileBot'
import ManageDomain from './ManageDomain'
import ManageTemplate from './ManageTemplate'
import ManageAccount from './ManageAccount'
import ManageContact from './ManageContact'
import ManageRequirement from './ManageRequirement'
import ManageSchedule from './ManageSchedule'
import Campaigns from './Campaigns'
import Requirements from './Requirements'
import Companies from './Companies'
import Schedules from './Schedules'
import Clients from './Clients'
import SaileBots from './SaileBots'
import Domains from './Domains'
import Accounts from './Accounts'
import Contacts from './Contacts'
import Events from './Events'
import Templates from './Templates'
import NotFound from '../components/NotFound'




export default class Routes extends React.Component {
    render(){
        return (
            <BrowserRouter >
                <Container style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link color="inherit" to="/" >
                            Companies
                        </Link>
                        <Link color="inherit" to="/manage-company" >
                            Create Company
                        </Link>
                        {/* <Link color="inherit" to="/clients" >
                            Clients
                        </Link>
                        <Link color="inherit" to="/manage-campaign" >
                            Create Campaign
                        </Link>
                        <Link color="inherit" to="/templates" >
                            Templates
                        </Link>
                        <Link color="inherit" to="/manage-template" >
                            Create Template
                        </Link> */}
                    </Breadcrumbs>      

                    <Switch >
                        <Route
                            exact
                            path='/' 
                            component={Companies}
                        />
                        <Route
                            exact
                            path='/manage-company' 
                            component={ManageCompany}
                        />
                        <Route
                            exact
                            path='/clients' 
                            component={Clients}
                        />
                        <Route
                            exact
                            path='/accounts-by-campaign' 
                            component={Accounts}
                        />
                        <Route
                            exact
                            path='/contacts-by-account' 
                            component={Contacts}
                        />
                        <Route
                            exact
                            path='/events-by-contact' 
                            component={Events}
                        />
                        <Route
                            exact
                            path='/sailebots' 
                            component={SaileBots}
                        />
                        <Route
                            exact
                            path='/sailebots-by-client' 
                            component={SaileBots}
                        />
                        <Route
                            exact
                            path='/domains-by-sailebot' 
                            component={Domains}
                        />
                        <Route
                            exact
                            path='/clients-by-company' 
                            component={Clients}
                        />
                        <Route
                            exact
                            path='/requirements-by-sailebot' 
                            component={Requirements}
                        />
                        <Route
                            exact
                            path='/campaigns-by-requirement' 
                            component={Campaigns}
                        />
                        <Route
                            exact
                            path='/manage-client' 
                            component={ManageClient}
                        />
                        <Route
                            exact
                            path='/manage-sailebot' 
                            component={ManageSaileBot}
                        />
                        <Route
                            exact
                            path='/manage-domain' 
                            component={ManageDomain}
                        />
                       <Route
                            exact
                            path='/manage-requirement' 
                            component={ManageRequirement}
                        />
                       <Route
                            exact
                            path='/manage-campaign' 
                            component={ManageCampaign}
                        />
                       <Route
                            exact
                            path='/manage-account' 
                            component={ManageAccount}
                        />
                       <Route
                            exact
                            path='/manage-contact' 
                            component={ManageContact}
                        />
                       <Route
                            exact
                            path='/manage-schedule' 
                            component={ManageSchedule}
                        />
                        <Route
                            exact
                            path='/templates-by-campaign' 
                            component={Templates}
                        />
                        <Route
                            exact
                            path='/schedules-by-campaign' 
                            component={Schedules}
                        />
                        <Route
                            exact
                            path='/manage-template' 
                            component={ManageTemplate}
                        />
                        <Route component={NotFound}/>
                        <Route path='/404' component={NotFound}/>
                    </Switch>
                </Container>
            </BrowserRouter>
        );
    }
}
