import React from 'react';
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
import BusinessIcon from '@material-ui/icons/Business';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import List from '@material-ui/core/List';
import { Link as RouterLink } from 'react-router-dom';


export default function DashboardSideBar (props) {
    return (
        <List >
          <div>
            <ListItem button  component={RouterLink} to="/app/companies">
              <ListItemIcon>
                <BusinessIcon style={{ color: '#43485a' }}/>
              </ListItemIcon>
              <ListItemText primary="Companies" />
            </ListItem>
            <ListItem button  component={RouterLink} to="/app/clients">
              <ListItemIcon>
                <PeopleIcon style={{ color: '#43485a' }}/>
              </ListItemIcon>
              <ListItemText primary="New Clients" />
            </ListItem>
            {
              window.location.hostname === "localhost" &&
              <ListItem button  component={RouterLink} to="/app/deployments">
                <ListItemIcon>
                  <SupervisedUserCircleIcon style={{ color: '#43485a' }}/>
                </ListItemIcon>
                <ListItemText primary="Deployments" />
              </ListItem>
            }
            {/* <ListItem button  component={RouterLink} to="/app/sailebots">
              <ListItemIcon>
                <PeopleIcon style={{ color: '#43485a' }}/>
              </ListItemIcon>
              <ListItemText primary="Sailebots" />
            </ListItem> */}
            {/* <ListItem button  component={RouterLink} to="/app/contacts">
              <ListItemIcon>
                <ContactMailIcon style={{ color: '#43485a' }}/>
              </ListItemIcon>
              <ListItemText primary="Contacts" />
            </ListItem>
            <ListItem button  component={RouterLink} to="/app/requirements">
              <ListItemIcon>
                <SettingsApplicationsIcon style={{ color: '#43485a' }}/>
              </ListItemIcon>
              <ListItemText primary="Requirements" />
            </ListItem>
            <ListItem button component={RouterLink} to="/app/domains">
              <ListItemIcon>
                <DnsIcon style={{ color: '#43485a' }}/>
              </ListItemIcon>
              <ListItemText primary="Domains" />
            </ListItem>
            <ListItem button  component={RouterLink} to="/app/accounts">
              <ListItemIcon>
                <AccountTreeIcon style={{ color: '#43485a' }}/>
              </ListItemIcon>
              <ListItemText primary="Accounts" />
            </ListItem>
            <ListItem button  component={RouterLink} to="/app/campaigns">
              <ListItemIcon>
                <LayersIcon style={{ color: '#43485a' }}/>
              </ListItemIcon>
              <ListItemText primary="Campaigns" />
            </ListItem>
            <ListItem button  component={RouterLink} to="/app/campaigns">
              <ListItemIcon>
                <LoyaltyIcon style={{ color: '#43485a' }}/>
              </ListItemIcon>
              <ListItemText primary="Campaigns" />
            </ListItem>
            <ListItem button  component={RouterLink} to="/app/events">
              <ListItemIcon>
                <EventIcon style={{ color: '#43485a' }}/>
              </ListItemIcon>
              <ListItemText primary="Events" />
            </ListItem>
            <ListItem button  component={RouterLink} to="/app/schedules">
              <ListItemIcon>
                <ScheduleIcon style={{ color: '#43485a' }}/>
              </ListItemIcon>
              <ListItemText primary="Schedules" />
            </ListItem>
            <ListItem button  component={RouterLink} to="/app/templates">
              <ListItemIcon>
                <ArtTrackIcon style={{ color: '#43485a' }}/>
              </ListItemIcon>
              <ListItemText primary="Templates" />
            </ListItem> */}
          </div>
        </List>
    );
} 

export const mainListItems = (props) => (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);
