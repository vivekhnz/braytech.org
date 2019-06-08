import * as ls from '../localStorage';

const savedState = ls.get('setting.collectibleDisplayState') ? ls.get('setting.collectibleDisplayState') : {};
const defaultState = {
  hideTriumphRecords: false,
  hideChecklistItems: false,
  hideInvisibleCollectibles: true,
  hideInvisibleTriumphRecords: true,
  hideAcquiredCollectibles: false,
  ...savedState
};

export default function collectiblesReducer(state = defaultState, action) {
  switch (action.type) {
    case 'SET_COLLECTIBLES':
      let newState = {
        ...state,
        ...action.payload
      }

      ls.set('setting.collectibleDisplayState', newState);
      return newState;
    default:
      return state;
  }
}
