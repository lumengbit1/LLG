import { fromJS, Map } from 'immutable';
import { createSelector } from 'reselect';

//constants
const SELECT_BET      = 'app/PlaceBets/SELECT_BET';
const CANCEL_BET      = 'app/PlaceBets/CANCEL_BET';
const SET_QUANTITY    = 'app/PlaceBets/SET_QUANTITY';
const SET_BETS        = 'app/PlaceBets/SET_BETS';
const SET_RESULT      = 'app/PlaceBets/SET_RESULT';
const HIDE_RESULT     = 'app/PlaceBets/HIDE_RESULT';

//TODO: replace these with Scatter
const CHANGE_BALANCE  = 'app/PlaceBets/CHANGE_BALANCE';

//actions
export function selectBet(betType,quantity) {
  return {
    type: SELECT_BET,
    betType,
    quantity,
  };
}

export function cancelBet() {
  return {
    type: CANCEL_BET,
  };
}

export function setQuantity(quantity,token) {
  return {
    type: SET_QUANTITY,
    quantity,
    token,
  };
}

export function setBets(bets) {
  return {
    type: SET_BETS,
    bets,
  };
}

export function setResult(result) {
  return {
    type: SET_RESULT,
    result,
  };
}

export function hideResult() {
  return {
    type: HIDE_RESULT,
  };
}

//TODO: remove mockup only
export function changeBalance(delta) {
  return {
    type: CHANGE_BALANCE,
    delta,
  };
}

//state
const initialState = fromJS({
  //betType: null,
  lockedBets: [],
  balance: 10000,
  quantity: 0,
  token: 'EOS', //or LLG
  selectedBets: Map(),
  showResult: false,
  results: {
    winners: [],
    deltas: [],
  },
});

//reducer
function PlaceBetsReducer(state = initialState, action) {
  switch (action.type) {
    //TODO: remove - mockup only
    case CHANGE_BALANCE:
      return state.set('balance',state.get('balance')+action.delta);
    case SET_BETS:
      return state.set('lockedBets',action.bets);
    case SELECT_BET:
      const currSelection = state.get('selectedBets');
      if(!currSelection.has(action.betType)) {
        return state.set('selectedBets', currSelection.set(action.betType, action.quantity));
      } else {
        return state.set('selectedBets', currSelection.update(action.betType, val=>val+action.quantity));
      }
    case CANCEL_BET:
      return state.set('selectedBets', state.get('selectedBets').clear());
    case SET_QUANTITY:
      return state
      .set('quantity', action.quantity)
      .set('token', action.token);
    case SET_RESULT:
      return state
      .set('result',action.result)
      .set('showResult', true);
    case HIDE_RESULT:
      return state.set('showResult', false);
    default:
      return state;
  }
}

//selectors
const selectState        = state => state.get('PlaceBets');
export const selectBetTypes     = () => createSelector(selectState, substate => substate.get('selectedBets'));
export const selectBetQuantity  = () => createSelector(selectState, substate => substate.get('quantity'));
export const selectBetToken     = () => createSelector(selectState, substate => substate.get('token'));
export const selectLockedBets   = () => createSelector(selectState, substate => substate.get('lockedBets'));
export const selectResult       = () => createSelector(selectState, substate => substate.get('result'));
export const selectShowResult   = () => createSelector(selectState, substate => substate.get('showResult'));
export const selectBalance      = () => createSelector(selectState, substate => substate.get('balance')); //TODO: remove - mockup only
export default PlaceBetsReducer;
