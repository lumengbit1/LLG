import { createStore, combineReducers, applyMiddleware } from 'redux';
import soundsMiddleware from 'redux-sounds';
 
import { gameReducer } from '../reducers/game-reducer';
 
// Our soundsData is an object. The keys are the names of our sounds.
const soundsData = {
 
  // Alternatively, we can pass a configuration object.
  // All valid howler.js options can be used here.
  cardFlip: {
    src: [
      '../../sounds/card-flip.mp3',
    ],
    volume: 0.75
  },
 
  cardFlip: {
    src: [
      '../../sounds/countdown.mp3',
    ],
  }
}
 
// Pre-load our middleware with our sounds data.
const loadedSoundsMiddleware = soundsMiddleware(soundsData);
 
// Use as you would any other middleware.
const store = createStore(gameReducer, applyMiddleware(loadedSoundsMiddleware));
// (Using the condensed createStore released in Redux v3.1.0)