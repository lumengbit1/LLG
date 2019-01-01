import React, {Component} from 'react';
import TableSide from './TableSide';
import { withStyles } from '@material-ui/core/styles';
import bg from '../../images/bg.png';
import cardflip from '../../sounds/card-flip.mp3';
import {Howl, Howler} from 'howler';

const styles = theme => ({
  cardContent: {
    backgroundImage: `url(${bg})`
  },
})

class GameTable extends Component {
  audio = new Howl({
    src: [cardflip]
  });
  constructor(props) {
    super(props);
    this.state = {
      card: 0,
      draw: {
        playerHand: {
          title:'Player',
          hand:[],
          score:0,
          win:false,
        },
        bankerHand:{
          title:'Banker',
          hand:[],
          score:0,
          win:false,
        }
      }
    }
  }

  dealCards(draw) {
    if (!draw) return
    try {
      let pos = this.state.card;
      this.props.setResult(null);
      let player = [];
      let banker = [];

      if(pos >= 0) player.push(draw.playerCards[0]);
      if(pos >= 1) banker.push(draw.bankerCards[0]);
      if(pos >= 2) player.push(draw.playerCards[1]);
      if(pos >= 3) banker.push(draw.bankerCards[1]);
      if(pos >= 4 && draw.playerCards.length > 2) player.push(draw.playerCards[2]);
      if(pos >= 4 && draw.playerCards.length < 3) banker.push(draw.bankerCards[2]);
      if(pos === 5) banker.push(draw.bankerCards[2]);


      let playerScore = player.map(val=>val.value).reduce((acc,val)=>acc+(val<=9?val:0),0);
      let bankerScore = banker.map(val=>val.value).reduce((acc,val)=>acc+(val<=9?val:0),0);
      playerScore = playerScore >= 10 ? playerScore - 10*Math.floor(playerScore/10) : playerScore;
      bankerScore = bankerScore >= 10 ? bankerScore - 10*Math.floor(bankerScore/10) : bankerScore;

      this.setState({
        card: pos + 1,
        draw:{
          playerHand: {
            title:'Player',
            hand: player,
            score: playerScore,
            win: false,
          },
          bankerHand: {
            title:'Banker',
            hand: banker,
            score: bankerScore,
            win: false,
          }
      }});
      let r = 0.3 + Math.floor(Math.random()*60)/100
      this.audio.volume=r;
      if(pos%2==0){
        this.audio.stereo(-0.8);
      } else {
        this.audio.stereo(0.8);
      }
      this.audio.play();
    } catch(err) {
      console.error(err);
    }
  }

  pushCards(newDraw) {
    if(newDraw === null) {
      this.props.hideResult();
      this.props.clearLockedBets();
      this.setState({
        card: 0,
        draw: {
          playerHand: {
            title:'Player',
            hand:[],
            score:0,
            win:false,
          },
          bankerHand:{
            title:'Banker',
            hand:[],
            score:0,
            win:false,
          }
        }
      });
    } else {
      if (!newDraw) return

      let playerScore = newDraw.playerCards.map(val=>val.value).reduce((acc,val)=>acc+(val<=9?val:0),0);
      let bankerScore = newDraw.bankerCards.map(val=>val.value).reduce((acc,val)=>acc+(val<=9?val:0),0);
      playerScore = playerScore >= 10 ? playerScore - 10*Math.floor(playerScore/10) : playerScore;
      bankerScore = bankerScore >= 10 ? bankerScore - 10*Math.floor(bankerScore/10) : bankerScore;
      //console.log(playerScore);
      //console.log(bankerScore);

      let winners = [];
      let deltas = [];

      const lockedBets = this.props.lockedBets;

      try {
        if(newDraw.playerWin){
          winners.push('player');
        }
        if(newDraw.bankerWin){
          winners.push('banker');
        }
        if(newDraw.tieWin){
          winners.push('tie');
        }
        if(newDraw.playerPair) {
          winners.push('playerpair');
        }
        if(newDraw.bankerPair) {
          winners.push('bankerpair');
        }
      } catch (err) {
        console.error("Bet payout broke");
        console.error(err);
      }


      this.setState({
        card: this.state.card,
        draw:{
          playerHand: {
            title:'Player',
            hand: newDraw.playerCards,
            score: playerScore,
            win: newDraw.playerWin,
          },
          bankerHand: {
            title:'Banker',
            hand: newDraw.bankerCards,
            score: bankerScore,
            win: newDraw.bankerWin,
          }
      }});

      const result = {
        winners,
        deltas,
      }

      this.props.setResult(result);
    }
  }


  componentDidUpdate(prevProps,prevState) {
    if(prevProps.draw !== this.props.draw) {
      //this is super dirty
      if(this.props.draw && this.state.card === 0) {

        let total = this.props.draw.playerCards.length + this.props.draw.bankerCards.length;
        const statusTime = this.props.statusTime;
        //push cards time
        const totalTime = 10000 - (Date.now() - statusTime);
        const splitTime = totalTime > 0 ? totalTime / 10 : 100;

        console.log(splitTime);
        setTimeout(()=>this.dealCards(this.props.draw),0);
        setTimeout(()=>this.dealCards(this.props.draw),1*splitTime);
        setTimeout(()=>this.dealCards(this.props.draw),2*splitTime);
        setTimeout(()=>this.dealCards(this.props.draw),3*splitTime);
        if(total > 4) setTimeout(()=>this.dealCards(this.props.draw),4*splitTime);
        if(total > 5) setTimeout(()=>this.dealCards(this.props.draw),5*splitTime);

        setTimeout(()=>this.pushCards(this.props.draw),total * splitTime);
        setTimeout(()=>this.pushCards(null),10*splitTime);
      }


    }
  }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  render() {
    const {classes, currentGame} = this.props;
    this.audio.mute(!this.props.audio);
    return (
      <article>
        <div className="container">
          <div className="row">
                <TableSide {...this.state.draw.playerHand} bets={currentGame ? currentGame.playerBets : 0}/>
                {/* <div className="col-xs-2 mid-c-main-div" ></div> */}
                <TableSide {...this.state.draw.bankerHand} bets={currentGame ? currentGame.bankerBets : 0} />
          </div>
        </div>
      </article>
    )
  }
}

export default withStyles(styles)(GameTable);
