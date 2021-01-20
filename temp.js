import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions';
import { Switch, useHistory, Route, useRouteMatch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { createJWTClient } from '../../api/graphql/apollo';
import { CompanyList, Header, Menu, Profile } from '../../components';
import './Dashboard.scss';

const Dashboard = ({ admin, logout }) => {
  const history = useHistory();
  const client = createJWTClient(admin.admin_secret);
  const { path, url } = useRouteMatch();

  const [isDrawerOpen, toggleIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (!admin.loggedIn) history.push('/signin');
  }, [admin, history]);

  const handleSignOut = () => logout();
  const handleToggleIsOpen = () => toggleIsDrawerOpen(!isDrawerOpen);

  return (
    <ApolloProvider client={client}>
      <div className="dashboard">
        <Header handleSignOut={handleSignOut} user={admin.user} />
        <Menu
          {...{
            isOpen: isDrawerOpen,
            handleToggleIsOpen,
            url
          }}
        />
        <main>
          <Switch>
            <Route exact path={`${path}/companies`}>
              <CompanyList />
            </Route>
            <Route exact path={`${path}/profile`}>
              <Profile user={admin.user} />
            </Route>
          </Switch>
        </main>
      </div>
    </ApolloProvider>
  );
};

export default connect(
  state => ({
    admin: state.admin
  }),
  { logout }
)(Dashboard);




  

