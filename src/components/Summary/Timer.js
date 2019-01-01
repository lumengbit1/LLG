
import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Countdown from 'react-countdown-now';
import { Trans } from 'react-i18next';
import countdownsound from '../../sounds/countdown.mp3';
import {Howl, Howler} from 'howler';
class Timer extends Component {
  audio = new Howl({src:[countdownsound]});
  constructor(props) {
    super(props);
    this.state = {
      drawTime: 0,
      timeDiff: 0,
      timeRemaining: 0,
      playing: false,
    }
  }

  updateTime() {
    const drawTime = this.props.currentGame ? this.props.currentGame.drawTime : Date.now();
    const currTime = this.props.currentGame ? this.props.currentGame.currTime : Date.now();
    const timeDiff = this.state.drawTime - Date.now() - this.state.timeDiff;
    if(timeDiff>0 && timeDiff<=11000){
      if(!this.state.playing){
        // this.audio = new Audio(countdownsound);
        this.audio.seek = (11000 - timeDiff)/1000;
        // this.audio.muted = audio;
        this.audio.play();
        this.state.playing = true;
      }
    } else {
      this.state.playing = false;
    }
    //console.log(`${timeDiff} vs ${drawTime - currTime} + ${this.state.timeDiff}`);
    this.setState({
      drawTime: this.state.drawTime !== drawTime ? drawTime : this.state.drawTime,
      timeDiff: this.state.drawTime !== drawTime ? currTime - Date.now() : this.state.timeDiff,
      timeRemaining: timeDiff >= 0 ? timeDiff : 0,
    });
  }

  componentDidMount() {
    this.interval = setInterval(() => this.updateTime(), 133);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  msToMS( duration ) {
    let milliseconds = parseInt((duration%1000)/100)
        , seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
}

  render() {
    const showResult = this.props.status === 'drawing';
    const frozen = this.props.currentGame ? this.props.currentGame.frozen : false;
    this.audio.mute(!this.props.audio);

    return(
        <div className="timer-div gradient-border">
        {/**using count class default to 2 minutes always**/}
          {frozen ? (<div>Game<br/>Paused</div>) : (
            this.state.timeRemaining === 0 || showResult ? (<div><Trans i18nKey="drawingcards.label"></Trans></div>) : (
              <div><Trans i18nKey="timer.label"></Trans><br/>
              <span className={(!showResult && this.state.timeRemaining<=11000) ? 'flashingRed' : ''}>
                {showResult ? this.msToMS(0) : this.msToMS(this.state.timeRemaining)}
              </span>
            </div>)
          )}
        </div>
    );
  }
}

export default Timer;
