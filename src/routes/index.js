
import React from 'react';
import clsx from 'clsx';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';

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
import AssignmentIcon from '@material-ui/icons/Assignment';

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
import DashboardSideBar from '../components/DashboardSideBar';
import Title from '../components/Title';

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


export default function Routes() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
      setOpen(true);
    };
    const handleDrawerClose = () => {
      setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  
  
    return (
        <div className={classes.root}>
            <BrowserRouter >
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
                    {/* <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                        <NotificationsIcon />
                        </Badge>
                    </IconButton> */}
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
                        <Container style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                            {/* <Breadcrumbs aria-label="breadcrumb">
                                <RouterLink color="inherit" to="/" >
                                    Companies
                                </RouterLink>
                                <RouterLink color="inherit" to="/manage-company" >
                                    Create Company
                                </RouterLink>
                            </Breadcrumbs>       */}

                            <Switch >
                                <Route
                                    exact
                                    path='/' 
                                    component={Clients}
                                />
                                {/* <Route
                                    exact
                                    path='/companies' 
                                    component={Companies}
                                />
                                <Route
                                    exact
                                    path='/manage-company' 
                                    component={ManageCompany}
                                /> */}
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
                                    path='/accounts' 
                                    component={Accounts}
                                />
                                <Route
                                    exact
                                    path='/contacts-by-account' 
                                    component={Contacts}
                                />
                                <Route
                                    exact
                                    path='/contacts' 
                                    component={Contacts}
                                />
                                <Route
                                    exact
                                    path='/events-by-contact' 
                                    component={Events}
                                />
                                <Route
                                    exact
                                    path='/events' 
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
                                    path='/domains' 
                                    component={Domains}
                                />
                                {/* <Route
                                    exact
                                    path='/clients-by-company' 
                                    component={Clients}
                                />
                                <Route
                                    exact
                                    path='/clients' 
                                    component={Clients}
                                /> */}
                                <Route
                                    exact
                                    path='/requirements-by-sailebot' 
                                    component={Requirements}
                                />
                                <Route
                                    exact
                                    path='/requirements' 
                                    component={Requirements}
                                />
                                <Route
                                    exact
                                    path='/campaigns-by-requirement' 
                                    component={Campaigns}
                                />
                                <Route
                                    exact
                                    path='/campaigns' 
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
                                    path='/templates' 
                                    component={Templates}
                                />
                                <Route
                                    exact
                                    path='/schedules-by-campaign' 
                                    component={Schedules}
                                />
                                <Route
                                    exact
                                    path='/schedules' 
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
                </Paper>
            </BrowserRouter>
        </div>
    );
}
