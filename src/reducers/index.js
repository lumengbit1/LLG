import { combineReducers } from 'redux-immutable'
//import { reducer as formReducer } from 'redux-form'
import PlaceBets from './PlaceBets'
import GameState from '../sagas/GameState/reducer'

const reducers = combineReducers({
  PlaceBets,
  GameState,
  //form: formReducer
})

export default reducers
