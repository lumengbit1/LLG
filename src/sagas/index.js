import { all, fork } from 'redux-saga/effects'

import GameState from './GameState/saga';

export default function* root() {
  yield all([
    fork(GameState)
  ])
}
