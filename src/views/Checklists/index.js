import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import cx from 'classnames';

import ObservedImage from '../../components/ObservedImage';
import Button from '../../components/UI/Button';
import Checklist from '../../components/Checklist';

import checklists from '../../utils/checklists';

import './styles.css';


function getItemsPerPage(width) {
  if (width >= 1920) return 6;
  if (width >= 1600) return 5;
  if (width >= 1200) return 4;
  if (width >= 800) return 3;
  if (width >= 660) return 2;
  if (width >= 500) return 1;
  return 1;
}

const ListButton = p => (
  <li key={p.name} className='linked'>
    {p.icon ? <div className={p.icon} /> : <ObservedImage className='image' src={p.image} />}
    <a
      className={cx({
        active: p.visible
      })}
      onClick={p.onClick}
    />
  </li>
);

export class Checklists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      itemsPerPage: getItemsPerPage(props.viewport.width)
    };
  }

  toggleCompleted = () => {
    let currentState = this.props.collectibles;
    let newState = {
      hideCompletedChecklistItems: !currentState.hideCompletedChecklistItems
    };

    this.props.setCollectibleDisplayState(newState);
  };

  componentDidUpdate(prevProps, prevState) {
    const newWidth = this.props.viewport.width;
    if (prevProps.viewport.width !== newWidth) {
      this.setState({ itemsPerPage: getItemsPerPage(newWidth) });
    }
    if (prevState.itemsPerPage !== this.state.itemsPerPage || prevState.page !== this.state.page) {
      this.props.rebindTooltips();
    }
  }

  changeSkip = index => {
    this.setState({
      page: Math.floor(index / this.state.itemsPerPage)
    });
  };

  render() {
    const { t } = this.props;
    const { page, itemsPerPage } = this.state;

    const lists = [
      checklists[1697465175](),
      checklists[3142056444](),
      checklists[4178338182](),
      checklists[2360931290](),
      checklists[365218222](),
      checklists[2955980198](),
      checklists[2609997025](),
      checklists[1297424116](),
      checklists[2726513366](),
      checklists[1420597821](),
      checklists[3305936921](),
      checklists[655926402]()
    ];

    let sliceStart = parseInt(page, 10) * itemsPerPage;
    let sliceEnd = sliceStart + itemsPerPage;

    const visible = lists.slice(sliceStart, sliceEnd);

    const toggleCompletedLink = (
      <Button action={this.toggleCompleted}>
        {this.props.collectibles.hideCompletedChecklistItems ? (
          <>
            <i className='segoe-uniF16E' />
            {t('Show all')}
          </>
        ) : (
          <>
            <i className='segoe-uniF16B' />
            {t('Hide completed')}
          </>
        )}
      </Button>
    );

    return (
      <>
        <div className='view' id='checklists'>
          <div className={cx('module', 'head', 'cols-' + this.state.itemsPerPage)}>
            <div className='content'>
              <div className='page-header'>
                <div className='sub-name'>{t('Location collections')}</div>
                <div className='name'>{t('Checklists')}</div>
              </div>
            </div>
            <div className='content source'>
              <p>Mapping data</p>
              <p>
                Data for some checklists is supplemented by hand of an Iron Lord,{' '}
                <a href='https://lowlidev.com.au/destiny/' target='_blank' rel='noopener noreferrer'>
                  lowlidev
                </a>
                , and he deserves your favour, Guardian.
              </p>
            </div>
          </div>
          <div className={cx('padder', 'cols-' + this.state.itemsPerPage)}>
            <div className='module views'>
              <ul className='list'>
                {lists.map((list, i) => (
                  <ListButton name={list.checklistName} icon={list.checklistIcon} image={list.checklistImage} key={i} visible={visible.includes(list)} onClick={() => this.changeSkip(i)} />
                ))}
              </ul>
            </div>
            {visible.map(list => (
              <div className='module list' key={list.checklistName}>
                <Checklist {...list} />
              </div>
            ))}
          </div>
        </div>
        <div className='sticky-nav'>
          <div className='wrapper'>
            <div />
            <ul>
              <li>{toggleCompletedLink}</li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    member: state.member,
    collectibles: state.collectibles,
    viewport: state.viewport
  };
}

function mapDispatchToProps(dispatch) {
  return {
    rebindTooltips: value => {
      dispatch({ type: 'REBIND_TOOLTIPS', payload: new Date().getTime() });
    },
    setCollectibleDisplayState: value => {
      dispatch({ type: 'SET_COLLECTIBLES', payload: value });
    }
  };
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withTranslation()
)(Checklists);
