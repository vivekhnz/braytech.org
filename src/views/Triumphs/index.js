import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import Root from './Root';
import SealNode from './SealNode';
import PresentationNode from './PresentationNode';

import './styles.css';

class Triumphs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };

    this.toggleCompleted = this.toggleCompleted.bind(this);
  }

  toggleCompleted = () => {
    let currentState = this.props.collectibles;
    let newState = {
      hideTriumphRecords: !currentState.hideTriumphRecords,
      hideChecklistItems: currentState.hideChecklistItems
    }

    this.props.setCollectibleDisplayState(newState);
  };

  componentDidUpdate(prevProps) {
    if (!this.props.match.params.quaternary && prevProps.location.pathname !== this.props.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const {t} = this.props;
    let primaryHash = this.props.match.params.primary ? this.props.match.params.primary : false;

    let toggleCompletedLink = (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a onClick={this.toggleCompleted}>
        {this.props.collectibles.hideTriumphRecords ? (
          <>
            <i className='uniF16E' />
            {t('Show all')}
          </>
        ) : (
          <>
            <i className='uniF16B' />
            {t('Hide redeemed')}
            
          </>
        )}
      </a>
    );

    if (!primaryHash) {
      return (
        <div className={cx('view', 'presentation-node', this.props.theme.selected)} id='triumphs'>
          <Root {...this.props} />
        </div>
      );
    } else if (primaryHash === 'seal') {
      return (
        <>
          <div className={cx('view', 'presentation-node', this.props.theme.selected)} id='triumphs'>
            <SealNode {...this.props} />
          </div>
          <div className='sticky-nav'>
            <div />
            <ul>
              <li>{toggleCompletedLink}</li>
              <li>
                <Link to='/triumphs'>
                  <i className='uniF094' />
                  {t('Back')}
                </Link>
              </li>
            </ul>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className={cx('view', 'presentation-node', this.props.theme.selected)} id='triumphs'>
            <PresentationNode {...this.props} primaryHash={primaryHash} />
          </div>
          <div className='sticky-nav'>
            <div />
            <ul>
              <li>{toggleCompletedLink}</li>
              <li>
                <Link to='/triumphs'>
                  <i className='uniF094' />
                  {t('Back')}
                </Link>
              </li>
            </ul>
          </div>
        </>
      );
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    profile: state.profile,
    collectibles: state.collectibles,
    theme: state.theme
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCollectibleDisplayState: value => {
      dispatch({ type: 'SET_COLLECTIBLES', payload: value });
    }
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNamespaces()
)(Triumphs);
