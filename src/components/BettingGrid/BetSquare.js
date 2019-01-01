import React from 'react'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Lock from '@material-ui/icons/Lock';
import { Trans } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import bg from '../../images/bg.png';
import {Howl, Howler} from 'howler';
import chipsStack from "../../sounds/chipsStack.mp3";
import $ from 'jquery';

const audio = new Howl({
    src: [chipsStack],
    stereo:0.8
});

const styles = theme => ({
  cardHeader: {
    backgroundColor: theme.palette.grey[900],
    backgroundImage: `url(${bg})`
  },
  cardSelected: {
    backgroundColor: theme.palette.grey[700],
    opacity: 0.8,
    backgroundImage: `url(${bg})`
  },
  cardContent: {
    backgroundImage: `url(${bg})`,
    height: 100,
  },
  cardInternal: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing.unit * 2,
  },
  cardBets: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: -theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: -theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
  },
  noselect: {
    userSelect: 'none',
  },
});

const BetSquare = props => {
  const {classes,Msg,betType,title,ratio,width,...betting} = props;
  const ourBets = betting.lockedBets ? betting.lockedBets : [];
  // const allBets = betting.currentGame ? betting.currentGame.allBets : [];
    audio.mute(!props.audio);
  const showResult = betting.status === 'drawing';
  const thisBetWon = betting.results ? betting.results.winners.indexOf(betType)>-1 : false;
  // const thisDelta = betting.results ? betting.results.deltas.find(d=>d.betType === betType) : 0;

  const imageIndices = [1,10,50,100,500,1000];

  // const totalBets = allBets.reduce((acc,val)=>{
  //   return acc + (val.betType === betType ? val.quantity : 0)
  // },0);

  const locked = betting.lockedBets.find(b=>b.betType === betType);
  const selected = betting.selection.has(betType) ? betting.selection.get(betType) : false;
  const active = locked || selected;
  const saving = betting.savingBet;

  const headerClass = active ? classes.cardSelected : classes.cardHeader;
  const header = active && ratio ? `(${ratio})` : '';
  const insideColor = active ? 'primary' : 'default';
  const quant = locked ? locked.quantity : selected;
// console.log('Msg',Msg);
  let totalBets = 0;
  let thisBets = 0;


// if(Msg!=temp){
//   {$("#div1").fadeOut(5000)};
// }
// let temp = Msg;




const value=Msg ? Msg.slice(Msg.indexOf('+'),Msg.indexOf('EOS')):'';
const eosmsg=Msg ? Msg.slice(Msg.indexOf('EOS')):'';
const mesinenty=Msg ? Msg.slice(0,Msg.indexOf('+')):'';



  if(betting.currentGame) {
    totalBets += betting.currentGame.playerBets;
    totalBets += betting.currentGame.bankerBets;
    // totalBets += betting.currentGame.tieBets;
    // totalBets += betting.currentGame.playerPairBets;
    // totalBets += betting.currentGame.bankerPairBets;
    if(betType === 'playerpair') thisBets = betting.currentGame.playerPairBets;
    if(betType === 'bankerpair' ) thisBets = betting.currentGame.bankerPairBets;
    if(betType === 'tie' ) thisBets = betting.currentGame.tieBets;
    if(betType === 'player' ) thisBets = betting.currentGame.playerBets;
    if(betType === 'banker' ) thisBets = betting.currentGame.bankerBets;
  }

  const betRatio = totalBets > 0 ? Number((thisBets / totalBets)*100).toFixed(0) : 0;
  const imageChoose = (quant>=1&&quant<10)? imageIndices.indexOf(1):((quant>=10&&quant<50)?imageIndices.indexOf(10):((quant>=50&&quant<100)?imageIndices.indexOf(50):((quant>=100&&quant<500)?imageIndices.indexOf(100):((quant>=500&&quant<1000)?imageIndices.indexOf(500):imageIndices.indexOf(1000)))));



  const getBetImage = (
    <React.Fragment>
      <div className="coin-m-div">
          {/*<img className={'stack1 coin' + imageIndices.indexOf(Math.round(10*quant)/10)} src={require(`../../images/chip.svg`)} alt="chip" />*/}
          {/*<img className="stack2 coin4" src={require(`../../images/chip.svg`)} alt="chip" />*/}
          {/*<img className="stack3 coin3" src={require(`../../images/chip.svg`)} alt="chip" />*/}

          {/*<img className='stack1' src={require(`../../images/Asset5.svg`)} alt="chip" />*/}
          {/*<img className='stack2' src={require(`../../images/Asset4.svg`)} alt="chip" />*/}
          {/*<img className='stack3' src={require(`../../images/Asset3.svg`)} alt="chip" />*/}
          {/*<img className='stack1' src={require(`../../images/Asset2.svg`)} alt="chip" />*/}
          {/*<img className='stack2' src={require(`../../images/Asset3.svg`)} alt="chip" />*/}
          {/*<img className='stack3' src={require(`../../images/Asset1.svg`)} alt="chip" />*/}

          {/*<img className={'stack1 coin' + imageIndices.indexOf((Math.round(quant*10))/10)} src={require(`../../images/Asset.svg`)} alt="chip" />*/}
          <img className={'stack1 coin' + imageChoose} src={require(`../../images/Asset.svg`)} alt="chip" />
          <img className="stack2 coin4" src={require(`../../images/Asset.svg`)} alt="chip" />
          <img className="stack3 coin3" src={require(`../../images/Asset.svg`)} alt="chip" />
          <div className="no"><span>{Math.round(10*quant)/10}</span></div>
      </div>
    </React.Fragment>
  )

  const inside = (
    <React.Fragment>
      {active ? (
        <React.Fragment>
          {/*{saving && !locked ? <CircularProgress size={24}/> : ''}*/}
          {getBetImage}
        </React.Fragment>
      ) : ('')}
    </React.Fragment>
  );

  const status = (
    <Typography variant="title" color={showResult ? (thisBetWon ? "primary" : "default"): "secondary"}>
      {showResult ? (
        thisBetWon ? (
          'WIN'
        ) : (
          'LOSE'
        )
      ) : (`${totalBets} EOS`)}
    </Typography>
  );

  const selectBet = () => {
      console.log('name',betting.selection);
    if(!locked && betting.quantity > 0 && !showResult && !saving) {
      let newbet = betting.quantity;
      let oldbet = selected ? selected : 0;
      if(betType === 'banker' || betType === 'player') {
        newbet = newbet+oldbet > 1000 ? 1000-oldbet : newbet;
      } else {
        newbet = newbet+oldbet > 100 ? 100-oldbet : newbet;
      }
      betting.selectBet(betType,newbet);
        audio.play();
    }
  }

  const BetSquareMarkup = () => {

    switch(betType) {
      case 'playerpair':
      case 'bankerpair':
        return (<td width="35%" valign="middle" onClick={()=>selectBet()}>
          <div className={`box-div sm-box ${locked ? 'show-chip-bet' : ''} ${thisBetWon && showResult ? 'winning' : ''}`}>
            <div className={`${betType==='playerpair' ? 'banker' : 'player'} bets`}>{thisBets} EOS</div>
              <div className={`${betType==='playerpair' ? 'bankerpair-TableNotify' : 'playerpair-TableNotify'} bets-TableNotify`}>{Msg}</div>
              <div className={`${betType==='player' ? 'bankerpair-TableNotify-highlight' : 'playerpair-TableNotify-highlight'} bets-TableNotify-highlight`} >{value}</div>
            <span>{inside}</span>
            {/*<div className="bottom-div">*/}
            <div className= {`${betType==='playerpair' ? 'banker-bottom-div' : 'player-bottom-div'} bottom-div`}>
              {/*<span className="has-text-upper" > <Trans i18nKey={betType + '.label'}></Trans><span>&nbsp;&nbsp;&nbsp;</span><span  className="bottom-ratio">{ratio}</span></span>*/}
              <span className="has-text-upper" > <Trans i18nKey={betType + '.label'}></Trans><p>{ratio}</p></span>
            </div>

          </div>
        </td>)
      case 'banker':
      case 'player':
        return (<td width="58%" valign="middle" onClick={()=>selectBet()} className={classes.noselect}>
        <div className={`box-div lg-box ${locked ? 'ready': ''} ${thisBetWon && showResult ? 'winning' : ''}`}>
        <div className={`${betType==='player' ? 'banker-lgtbcicle' : 'player-lgtbcicle'}`}>
          <div className={`${betType} c100 small p${betRatio} orange`}> <span>{betRatio}%</span>
            <div className="slice">
              <div className="bar"></div>
              <div className="fill"></div>
            </div>
        </div>
        </div>
          <div className={`${betType==='player' ? 'banker' : 'player'} bets`}>{thisBets} EOS</div>
            <div id="div1" className={`${betType==='player' ? 'banker-TableNotify' : 'player-TableNotify'} bets-TableNotify`} ><span className="valuemsg">{value}</span><span>{eosmsg+" "+mesinenty}</span></div>
            {/*<div className={`${betType==='player' ? 'banker-TableNotify-highlight' : 'player-TableNotify-highlight'} bets-TableNotify-highlight`} >{value}</div>*/}
          <span>{inside}</span>
          {/*<div className="bottom-div">*/}
          <div className={`${betType==='player' ? 'banker-bottom-div' : 'player-bottom-div'} bottom-div`}>
              {/*<p className="has-text-upper"><Trans i18nKey={betType + '.label'}></Trans><br /><p className="bottom-ratio">{ratio || '1:1'}</p></p>*/}
              <p className="has-text-upper"><Trans i18nKey={betType + '.label'}></Trans><p>{ratio || '1:1'}</p></p>
          </div>
        </div>
      </td>)
      case 'tie':
      default:
        return (<div onClick={()=>selectBet()} className={`mid-circle-info ${locked ? 'show-chip-bet' : ''} ${thisBetWon && showResult ? 'winning' : ''}`}>
          <div className="mid-inside">
            <div className='tie bets'>{thisBets} EOS</div>
              <div className="tie-TableNotify bets-TableNotify">{Msg}</div>
              <div className="tie-TableNotify-highlight bets-TableNotify-highlight" >{value}</div>
            <span>{inside}</span>
          </div>
          <div className="bottom-div">
              <p><Trans i18nKey={betType + '.label'}></Trans><br />{ratio}</p>
            </div>
        </div>)
    }
  }

  return (
      <React.Fragment>
        {BetSquareMarkup()}
      </React.Fragment>
  )
}

export default withStyles(styles)(BetSquare);
