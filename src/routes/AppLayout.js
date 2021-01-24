import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { getJWTAuth } from '../../utils/rest_api'

class AppLayout extends Component {
	componentWillMount() {
        console.log("AppLayout this.props: ", this.props)
    // this.props.loadUserFromToken();
  }

  render() {
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)} style={{ background: '#43485a' }}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Sailestack
                    </Typography>
                    {/* Testing unscubsciption */}
                    {/* <Link to={`/unsubscribe/saile.ai/clivercadogan@gmail.com/${41046}/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsiYW5vbnltb3VzIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFub255bW91cyJ9fQ.yWVXeBrOfRVsBnAmMiieQ3fFlASac9gZyET9gWSl9Eo`}>Unscribscribe</Link> */}
                    <LogoutButton />
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
                </div>
                <Divider />
                <DashboardSideBar/>
            </Drawer>
            <Paper className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container >
                    <Route
                        exact
                        path='/app' 
                        // component={Companies}
                        render={(routeProps) => (
                            <Companies {...routeProps} {...props} />
                        )}
                    />
                    <Route
                        exact
                        path='/app/deployments' 
                        component={Deployments}
                        // render={(routeProps) => (
                        //     <Deployments {...routeProps} {...props} />
                        // )}
                    />                        
                    <Route
                        exact
                        path='/app/clients' 
                        component={Clients}
                    />
                    <Route
                        exact
                        path='/app/companies' 
                        // component={Companies}
                        render={(routeProps) => (
                            <Companies {...routeProps} {...props} />
                        )}
                    />
                    <Route
                        exact
                        path='/app/accounts-by-schedule' 
                        component={ScheduleAccounts}
                    />
                    <Route
                        exact
                        path='/app/accounts-by-campaign' 
                        component={Accounts}
                    />
                    <Route
                        exact
                        path='/app/accounts' 
                        component={Accounts}
                    />
                    <Route
                        exact
                        path='/app/contacts-by-account' 
                        component={Contacts}
                    />
                    <Route
                        exact
                        path='/app/contacts' 
                        component={Contacts}
                    />
                    <Route
                        exact
                        path='/app/questionnaires-by-client' 
                        component={Questionnaires}
                    />
                    <Route
                        exact
                        path='/app/events-by-contact' 
                        component={Events}
                    />
                    <Route
                        exact
                        path='/app/events-by-campaign-contact' 
                        component={CampaignContactEvents}
                    />
                    <Route
                        exact
                        path='/app/events-by-sailebot' 
                        component={SailebotEvents}
                    />
                    <Route
                        exact
                        path='/app/events-by-client' 
                        component={SailebotEvents}
                    />
                    {/* <Route
                        exact
                        path='/app/clarifications-by-campaign' 
                        component={Clarifications}
                    /> */}
                    <Route
                        exact
                        path='/app/clarifications-by-campaign' 
                        render={(routeProps) => (
                            <Clarifications {...routeProps} {...props} />
                        )}
                    />
                    <Route
                        exact
                        path='/app/events' 
                        component={Events}
                    />
                    <Route
                        exact
                        path='/app/sailebots' 
                        component={SaileBots}
                    />
                    <Route
                        exact
                        path='/app/sailebots-by-client' 
                        component={SaileBots}
                    />
                    <Route
                        exact
                        path='/app/domains-by-sailebot' 
                        component={Domains}
                    />
                    <Route
                        exact
                        path='/app/domains' 
                        component={Domains}
                    />
                    <Route
                        exact
                        path='/app/domains-by-company' 
                        component={CompanyDomains}
                    />
                    <Route
                        exact
                        path='/app/company-domains' 
                        component={CompanyDomains}
                    />
                    <Route
                        exact
                        path='/app/clients-by-company' 
                        component={Clients}
                    />
                    {/* <Route
                        exact
                        path='/app/clients' 
                        component={Clients}
                    /> */}
                    <Route
                        exact
                        path='/app/requirements-by-sailebot' 
                        component={Requirements}
                    />
                    <Route
                        exact
                        path='/app/requirements' 
                        component={Requirements}
                    />
                    <Route
                        exact
                        path='/app/campaigns-by-requirement' 
                        component={Campaigns}
                    />
                    <Route
                        exact
                        path='/app/campaigns' 
                        component={Campaigns}
                    />
                    <Route
                        exact
                        path='/app/manage-client' 
                        component={ManageClient}
                    />
                    <Route
                        exact
                        path='/app/manage-company' 
                        component={ManageCompany}
                    />
                    <Route
                        exact
                        path='/app/manage-sailebot' 
                        component={ManageSaileBot}
                    />
                    <Route
                        exact
                        path='/app/manage-domain' 
                        component={ManageDomain}
                    />
                    <Route
                        exact
                        path='/app/manage-event' 
                        component={ManageEvent}
                    />
                    <Route
                        exact
                        path='/app/manage-company-domain' 
                        component={ManageCompanyDomain}
                    />
                    <Route
                        exact
                        path='/app/manage-requirement' 
                        component={ManageRequirement}
                    />
                    <Route
                        exact
                        path='/app/manage-campaign' 
                        component={ManageCampaign}
                    />
                    <Route
                        exact
                        path='/app/manage-account' 
                        component={ManageAccount}
                    />
                    <Route
                        exact
                        path='/app/manage-contact' 
                        component={ManageContact}
                    />
                    <Route
                        exact
                        path='/app/manage-schedule' 
                        component={ManageSchedule}
                    />
                    <Route
                        exact
                        path='/app/templates-by-campaign' 
                        component={Templates}
                    />
                    <Route
                        exact
                        path='/app/templates' 
                        component={Templates}
                    />
                    <Route
                        exact
                        path='/app/schedules-by-campaign' 
                        // component={Schedules}
                        render={(routeProps) => (
                            <Schedules {...routeProps} {...props} />
                        )}
                    />
                    <Route
                        exact
                        path='/app/schedules' 
                        component={Schedules}
                    />
                    <Route
                        exact
                        path='/app/manage-template' 
                        component={ManageTemplate}
                    />
                    {/* <Route path='/app/404' component={NotFound}/> */}
                </Container>                
            </Paper>
        </div>
    );
    }
}

export default connect(
    state => ({
      admin: state.admin,
    }),
    actions
)(AppLayout);