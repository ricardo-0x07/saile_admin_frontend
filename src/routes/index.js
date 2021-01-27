
import React, { useEffect } from 'react';
import clsx from 'clsx';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';

import { connect } from 'react-redux';
import { Container } from 'react-bootstrap'
import {
    Paper,
    makeStyles,
    CssBaseline,
    Drawer,
    AppBar,
    Toolbar,
    Typography,
    Divider,
    IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ApolloProvider} from "react-apollo";
import Login from './Login'
import DashboardSideBar from '../components/DashboardSideBar';
import { createJWTClient } from '../graphql/apollo';
import LogoutButton from './Logout/LogoutButton';
import * as actions from '../actions';
import { ADMIN_SECRET_HEADER_KEY } from '../actions/types'
import Unavailable from '../components/Unavailable';
import Unsubscribe from './Unsubscribe';
import Confirmation from './Unsubscribe/confirmation';
// import Companies from './Companies';
// import Deployments from './Deployments';
// import ManageEvent from './ManageEvent'
// import Questionnaires from './Questionnaires';
// import { useHistory, useLocation } from 'react-router-dom';
// import Alert from '@material-ui/lab/Alert';
import { useAsync } from 'react-async';


// import { Link } from 'react-router-dom';
import { getJWTAuth } from '../utils/rest_api'
import { getAllowedRoutes } from '../utils';
import PrivateRoutesConfig from '../utils/PrivateRoutesConfig';



const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    backgroundColor: '#1a45b3'
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));


function Routes({ dispatch, admin, login, logout, clearAdminSecretState }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    // const match = useRouteMatch('/app');
    let allowedRoutes = [];
     
    let token = sessionStorage.getItem(ADMIN_SECRET_HEADER_KEY);

    const { data, error, isPending, run } = useAsync({ deferFn: getJWTAuth });
    console.log("error: ", error)
    console.log("Boolean(error): ", Boolean(error))
    console.log("isPending: ", isPending)
    // console.log("history: ", history)
    // // const [credentials, updateCredentials] = useState({
    // //   token: ''
    // // });
    // const { from } = location.state || { from: { pathname: '/app/companies' } };
    // console.log("from: ", from)
  
    // // const authenticate = () => {
    // //   run({token});
    // // };
    console.log("clearAdminSecretState")
    useEffect(() => {
        if (data) login(data);
    }, [dispatch, data, login]);
    
    useEffect(() => {
        console.log("useEffect error: ", error)
      if (error) {
        console.log("clearAdminSecretState error: ", error)
        clearAdminSecretState();
      }
    }, [dispatch, error, clearAdminSecretState]);

    console.log("run")
    useEffect(() => {
        if (token) run({entity: {token}});
    }, [dispatch, token, run]);

    if (admin.loggedIn) {
        allowedRoutes = getAllowedRoutes(PrivateRoutesConfig);
    } else {
        // return <Redirect to="/auth" />;
    }
    console.log("allowedRoutes: ", allowedRoutes)




  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
    const handleDrawerClose = () => {
      setOpen(false);
    };
    // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    
    const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route
          {...rest}
          render={props => token // your auth mechanism goes here
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/auth' }} />}
        />
    );    
    function AuthLayout() {
      return (
        <div>
          <Route path="/auth/login" exact component={Login} />
          <Redirect from="/auth" to="/auth/login" exact />
        </div>
      );
    }

    const AppLayout = (props) => {
        console.log("AppLayout props: ", props)
        const match = useRouteMatch('/app');
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
                    {
                        true &&
                        <Container>
                            <Switch>
                                {allowedRoutes.map((route) => {

                                    const { 
                                    path, 
                                    component: Component,
                                    // children, 
                                    title,
                                    permission,
                                    ...rest 
                                    } = route;
                                    return (
                                    <Route
                                    {...rest}
                                    key={path}
                                    path={`${match.path}${path}`}
                                    render={(routeProps) => (
                                        <Component {...routeProps} {...props} />
                                    )}
        
                                    />
                                    // <Component children={children} />
                                    // </Route>
                                    )
                                })}
                                {
                                    // isAddNotFound && 
                                    <Route><Unavailable /></Route>
                                }
                            </Switch>
                        </Container>
                    }
                    {/* <Container >
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
                            path='/app/clarifications-by-campaign' 
                            render={(routeProps) => (
                                <Clarifications {...routeProps} {...props} />
                            )}
                        />
                        <Route
                            exact
                            path='/app/events-by-contact' 
                            component={Events}
                        />
                        <Route
                            exact
                            path='/app/events' 
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
                        <Route
                            exact
                            path='/app/manage-event' 
                            component={ManageEvent}
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
                            path='/app/manage-company-domain' 
                            component={ManageCompanyDomain}
                        />
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
                    </Container>      */}
                    {/* <Route path='/app/404' component={Unavailable}/> */}           
                </Paper>
            </div>
        );
    }  
    function WrappedAppLayout() {
        let  token = sessionStorage.getItem(ADMIN_SECRET_HEADER_KEY);
        // const client = createClient(token)
        const client = createJWTClient(token)
        
        return  (
            <ApolloProvider client={client}>
                <AppLayout client={client}/>
            </ApolloProvider>
        )
    }  
    return (
        
        <Switch >

            <Route exact path={`/unsubscribe/:company/:contactEmail/:contactId/:token`} component={Unsubscribe} />
            <Route exact path={`/confirm-unsubscription`} component={Confirmation} />
            {/* Confirmation */}
            <Route path="/auth" component={AuthLayout} />
            <PrivateRoute path="/app" component={WrappedAppLayout} />
            {/* <PrivateRoute exact from="/" to="/app" /> */}
            {/* <Route path="*" component={Unavailable} /> */}
        </Switch>
    );
}

export default connect(
    state => ({
      admin: state.admin,
    }),
    actions
)(Routes);