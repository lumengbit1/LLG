import { fromJS } from "immutable";
import { createSelector } from "reselect";
import {
  SET_LIMIT,
  SET_CURRENT_GAME,
  SET_LEADERBOARD,
  TOGGLE_AUDIO,
  SET_ROADMAP,
  PLACE_BETS,
  PLACED_BETS,
  SET_GAME_DRAW,
  SET_SCATTER,
  SET_IDENTITY,
  SET_ACCOUNT,
  SET_CLIENT,
  SET_STATUS,
  NODE_CHOOSE,
  SET_DAILY
} from "./constants";

//state
const initialState = fromJS({
  prevGame: null,
  currentGame: null,
  roadmap: null,
  audio: true,
  limit: 20000,
  results: null,
  placingBet: false,
  scatter: null,
  client: null,
  identity: null,
  account: null,
  status: "init",
  statusTime: Date.now(),
  node: "https://api.eosbeijing.one:443",
  daily: null
});

//reducer
function GameStateReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GAME_DRAW:
      return state.set("results", action.results);
    case SET_CURRENT_GAME:
      return state
        .set("currentGame", action.currentGame)
        .set("prevGame", action.prevGame);
    case SET_LEADERBOARD:
      return state.set("leaderboard", action.leaderboard);
    case TOGGLE_AUDIO:
      return state.set("audio", !state.get("audio"));
    case PLACE_BETS:
      return state.set("placingBet", true);
    case PLACED_BETS:
      return state.set("placingBet", false);
    case SET_SCATTER:
      return state.set("scatter", action.scatter);
    case SET_CLIENT:
      return state.set("client", action.client);
    case SET_IDENTITY:
      return state.set("identity", action.identity);
    case SET_LIMIT:
      return state.set("limit", action.limit);
    case SET_ACCOUNT:
      return state.set("account", action.account);
    case SET_ROADMAP:
      return state.set("roadmap", action.roadmap);
    case SET_STATUS:
      return state.set("status", action.status).set("statusTime", Date.now());
    case NODE_CHOOSE:
      return state.set("node", action.node);
    case SET_DAILY:
      return state.set("daily", action.daily);
    default:
      return state;
  }
}

//selectors
const selectState = state => state.get("GameState");
export const selectPrevGame = () =>
  createSelector(
    selectState,
    substate => substate.get("prevGame")
  );
export const selectCurrentGame = () =>
  createSelector(
    selectState,
    substate => substate.get("currentGame")
  );
export const selectLeaderboard = () =>
  createSelector(
    selectState,
    substate => substate.get("leaderboard")
  );
export const selectRoadmap = () =>
  createSelector(
    selectState,
    substate => substate.get("roadmap")
  );
export const selectResult = () =>
  createSelector(
    selectState,
    substate => substate.get("results")
  );
export const selectPlacingBet = () =>
  createSelector(
    selectState,
    substate => substate.get("placingBet")
  );
export const selectScatter = () =>
  createSelector(
    selectState,
    substate => substate.get("scatter")
  );
export const selectIdentity = () =>
  createSelector(
    selectState,
    substate => substate.get("identity")
  );
export const selectAudio = () =>
  createSelector(
    selectState,
    substate => substate.get("audio")
  );
export const selectAccount = () =>
  createSelector(
    selectState,
    substate => substate.get("account")
  );
export const selectClient = () =>
  createSelector(
    selectState,
    substate => substate.get("client")
  );
export const selectStatus = () =>
  createSelector(
    selectState,
    substate => substate.get("status")
  );
export const selectLimit = () =>
  createSelector(
    selectState,
    substate => substate.get("limit")
  );
export const selectStatusTime = () =>
  createSelector(
    selectState,
    substate => substate.get("statusTime")
  );
export const selectNode = () =>
  createSelector(
    selectState,
    substate => substate.get("node")
  );
export const selectDaily = () =>
  createSelector(
    selectState,
    substate => substate.get("daily")
  );

export default GameStateReducer;
