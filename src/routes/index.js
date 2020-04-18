
import React, { Component } from 'react';
import clsx from 'clsx';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Container } from 'react-bootstrap'
import {
    Paper,
    withStyles,
    makeStyles,
    CssBaseline,
    Drawer,
    Box,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    Badge,
    Grid,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import { ApolloProvider} from "react-apollo";

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
import ScheduleAccounts from './ScheduleAccounts'
import Contacts from './Contacts'
import Events from './Events'
import Templates from './Templates'
import Login from './Login'
import NotFound from '../components/NotFound'
import DashboardSideBar from '../components/DashboardSideBar';
import Title from '../components/Title';
import { createClient } from '../graphql/apollo';
import AppContainer from '../AppContainer';
import LogoutButton from './Logout/LogoutButton';
import * as actions from '../actions';
import { ADMIN_SECRET_HEADER_KEY } from '../actions/types'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
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


function Routes(props_) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
      setOpen(true);
    };
    const handleDrawerClose = () => {
      setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    let token = sessionStorage.getItem(ADMIN_SECRET_HEADER_KEY);
    
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

    const AppLayout = (propss) => {
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
                            Saile.AI Dashboard
                        </Typography>
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
                            component={Clients}
                        />
                        <Route
                            exact
                            path='/app/clients' 
                            component={Clients}
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
                        {/* <Route
                            exact
                            path='/app/clients-by-company' 
                            component={Clients}
                        />
                        <Route
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
                            component={Schedules}
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
    function WrappedAppLayout() {
        let token = sessionStorage.getItem(ADMIN_SECRET_HEADER_KEY);
        const client = createClient(token)
        return  (
            <ApolloProvider client={client}>
                <AppLayout client={client}/>
            </ApolloProvider>
        )
    }  
    return (
        
        <Paper >
            <Route path="/auth" component={AuthLayout} />
            <PrivateRoute path="/app" component={WrappedAppLayout} />
            {/* <Route path="*" component={NotFound} /> */}
        </Paper>
    );
}

export default connect(
    state => ({
      admin: state.admin,
    //   routing: state.routing
    }),
    actions
)(Routes);