import {
  SET_CURRENT_GAME,
  PLACED_BETS,
  GET_BALANCE,
  SET_ROADMAP,
  GET_AUDIO,
  TOGGLE_AUDIO,
  GET_CURRENT_GAME,
  PLACE_BETS,
  SET_GAME_DRAW,
  SET_STATUS,
  GET_LEADERBOARD,
  SET_LEADERBOARD,
  SET_SCATTER,
  SET_IDENTITY,
  GET_IDENTITY,
  SET_ACCOUNT,
  SET_CLIENT,
  SET_LIMIT,
  STAKE_LLG,
  CLAIM_LLG,
  NODE_CHOOSE
} from "./constants";

//get actions

export function getCurrentGame() {
  return {
    type: GET_CURRENT_GAME
  };
}

export function getBalance() {
  return {
    type: GET_BALANCE
  };
}

export function getLeaderboard() {
  return {
    type: GET_LEADERBOARD
  };
}

export function getAudio() {
  return {
    type: GET_AUDIO
  };
}

export function toggleAudio() {
  return {
    type: TOGGLE_AUDIO
  };
}

export function placeBets(referrer) {
  return {
    type: PLACE_BETS,
    referrer
  };
}

export function setCurrentGame(currentGame) {
  return {
    type: SET_CURRENT_GAME,
    currentGame
  };
}

export function setLeaderboard(leaderboard) {
  return {
    type: SET_LEADERBOARD,
    leaderboard
  };
}

export function setRoadmap(roadmap) {
  return {
    type: SET_ROADMAP,
    roadmap
  };
}

export function setResults(results) {
  return {
    type: SET_GAME_DRAW,
    results
  };
}

export function setStatus(status) {
  return {
    type: SET_STATUS,
    status
  };
}

export function setLimit(limit) {
  return {
    type: SET_LIMIT,
    limit
  };
}

export function placedBets(placedBets) {
  return {
    type: PLACED_BETS,
    placedBets
  };
}

export function setScatter(scatter) {
  return {
    type: SET_SCATTER,
    scatter
  };
}

export function setClient(client) {
  return {
    type: SET_CLIENT,
    client
  };
}

export function getIdentity(reset = false) {
  return {
    type: GET_IDENTITY,
    reset
  };
}

export function setIdentity(identity) {
  return {
    type: SET_IDENTITY,
    identity
  };
}

export function setAccount(account) {
  return {
    type: SET_ACCOUNT,
    account
  };
}

export function stakeLLG(quantity, stake = true) {
  return {
    type: STAKE_LLG,
    quantity,
    stake
  };
}

export function claimLLG() {
  return {
    type: CLAIM_LLG
  };
}

export function setNode(node) {
  return {
    type: NODE_CHOOSE,
    node
  };
}
