import React from 'react'
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Input';
import Notifier, { openSnackbar } from '../BetNotifications';
import { withStyles } from '@material-ui/core/styles';
import bg from '../../images/bg.png';
import { Trans } from 'react-i18next';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit*2,
  },
  formControl: {
    margin: theme.spacing.unit,
    //marginTop: -theme.spacing.unit*3,
  },
  inputPosition: {
    marginTop: theme.spacing.unit*1,
  },
  balancePosition: {
    margin: theme.spacing.unit*1,
  },
  cardContent: {
    backgroundImage: `url(${bg})`,
    //opacity: 0.5,
  },
  spacer: {
    marginTop: theme.spacing.unit,
  }
});

const values = [1,10,50,100,500,1000];
//const maxMainBet = 100;
//const maxSideBet = 10;

const BetChips = props => {
  const {...betting} = props;
  const ref = betting.location.search.includes('?r=') ? betting.location.search.split('=')[1] : null;
  const saving = betting.savingBet;
  //console.log(ref);

    const quant = betting.selection.has('playerpair') ? betting.selection.get('playerpair') : (betting.selection.has('player') ? betting.selection.get('player') : (betting.selection.has('tie') ? betting.selection.get('tie') : (betting.selection.has('banker') ? betting.selection.get('banker') : (betting.selection.has('bankerpair') ? betting.selection.get('bankerpair') : false))))

  const makeBet = quantity => {
    //toggle the selection off
    if(quantity === betting.quantity) {
      betting.makeBet(0);
    } else {
      betting.makeBet(quantity);
    }
  }

  const clear = () => {
    if(!saving){
        betting.makeBet(0);
        betting.cancelBet();
    }
  }

  const placeBets = () => {
    // console.log('quant',quant)
    if(!showResult && !saving && quant){
      betting.placeBets(ref);
      showNotifier(betting);
    }
  }

  const showNotifier = (message) => {
    if ((message.selection).size > 0) {
    	// TODO: Specify player that made bet
    	var notification = message.selection;
    	openSnackbar({ message:notification });
      }
    }

  const showResult = betting.status === 'drawing' || (betting.currentGame ? betting.currentGame.frozen : false);

  return(
    <section className="coin-section">
    <div className="container">
      <div className="row">
        <div className="col-xs-3 left">
  <div className="lr-box">{showResult ? (<Trans i18nKey="nomorebets.label"></Trans>) : (<Trans i18nKey="placeyourbets.label"></Trans>) }</div>
        </div>
        <div className="col-xs-6 mid">
          <div className="mid-content">
           <a className="btn btn-undo" onClick={()=>clear()}>
           {/*<img src={require('../../images/undo.png')} width="30" height="34" /> <Trans i18nKey="undo.label"></Trans></a>*/}
           <Trans i18nKey="undo.label"></Trans></a>
           <a className="btn btn-comfirm" onClick={()=>{placeBets()}} >{!saving ? (<Trans i18nKey="confirm.label"></Trans>) : <Trans i18nKey="sending.label"></Trans>}</a>
            <table cellPadding="0" cellSpacing="0" width="100%">
            <tbody>
              <tr>
              {values.map((value, index) => (
                <td key={index} className={betting.quantity===value ? 'active' : betting.quantity===0 ? 'nobet' : '' }><div className="coin-icon" onClick={()=>makeBet(value)}>
                {/*<img src={require(`../../images/chip.svg`)} className={'coin' + index} width="100" height="100" />*/}
                {/*change chips*/}
                {/*<img src={require('../../images/Asset'+index+'.svg')} className={'coin' + index} width="100" height="100" />*/}
                <img src={require(`../../images/Asset.svg`)} className={'coin' + index} width="100" height="100" />
                <div className="n0"><span>{value}</span></div>
               </div></td>
              ))}
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-xs-3 right">
          <div className="lr-box">
            <table cellPadding="0" cellSpacing="0" width="100%">
                <tbody>
                  <tr>
                    <td><Trans i18nKey="balance.label"></Trans> </td>
                    {/* <td className="bl"> {Number(betting.balance).toFixed(4)} <span>eos</span></td> */}
                    <td className="bl">{Number(betting.balance ? betting.balance.eos : 0).toFixed(4)}</td>
                  </tr>
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div className="bottom-black"> </div>
  </section>
  )
}

export default withStyles(styles)(BetChips);
