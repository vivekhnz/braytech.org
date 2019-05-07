import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import store from './utils/reduxStore';

import Clan from './views/Clan';
import Legend from './views/Legend';
import Competitive from './views/Competitive';
import Multiplayer from './views/Multiplayer';
import Collections from './views/Collections';
import Triumphs from './views/Triumphs';
import Checklists from './views/Checklists';
import Account from './views/Account';
import SitRep from './views/SitRep';
import ThisWeek from './views/ThisWeek';
import Header from './components/UI/Header';
import Spinner from './components/UI/Spinner';

import Dossier from './views/Dossier';

class ProfileRoutes extends React.Component {
  componentDidMount() {
    const { membershipId, membershipType, characterId } = this.props.match.params;

    store.dispatch({
      type: 'MEMBER_SET_BY_PROFILE_ROUTE',
      payload: { membershipType, membershipId, characterId }
    });
  }

  render() {
    const { member, location, match } = this.props;
    // console.log(member, location, match);

    if (member.error) {
      // Character select will be able to display the error for us & prompt
      // them to pick a new character / member
      return <Redirect to={{ pathname: '/character-select', state: { from: location } }} />;
    }

    if (!member.data) {
      return (
        <>
          <Route path='/' render={route => <Header route={route} {...this.state} {...this.props} />} />
          <div className='profile-route-loading'>
            <Spinner />
          </div>
        </>
      );
    }

    return (
      <>
        <Route path='/' render={route => <Header route={route} {...this.state} {...this.props} />} />
        <Switch>
          <Route path={`${match.url}/account`} exact render={route => <Account />} />
          <Route path={`${match.url}/clan/:view?/:subView?`} exact render={route => <Clan view={route.match.params.view} subView={route.match.params.subView} />} />
          <Route path={`${match.url}/legend`} exact render={route => <Legend />} />
          <Route path={`${match.url}/competitive`} exact render={route => <Competitive />} />
          <Route path={`${match.url}/checklists`} exact component={Checklists} />
          <Route path={`${match.url}/collections/:primary?/:secondary?/:tertiary?/:quaternary?`} render={route => <Collections {...route} />} />
          <Route path={`${match.url}/triumphs/:primary?/:secondary?/:tertiary?/:quaternary?`} render={route => <Triumphs {...route} />} />
          <Route path={`${match.url}/this-week`} exact render={() => <ThisWeek />} />>
          <Route path={`${match.url}/sit-rep`} exact render={route => <SitRep />} />
          <Route path={`${match.url}/dossier`} render={route => <Dossier />} />
          <Route path={`${match.url}/multiplayer/crucible/:mode?`} render={route => <Multiplayer {...route} />} />
          <Route path={`${match.url}/multiplayer`} render={route => <Redirect to={{ pathname: `${match.url}/multiplayer/crucible` }} />} />
          <Route path={`${match.url}/`} render={route => <Redirect to={{ pathname: `${match.url}/sit-rep` }} />} />
        </Switch>
      </>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    member: state.member
  };
}

export default connect(mapStateToProps)(ProfileRoutes);
