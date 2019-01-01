import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectBet,
  cancelBet,
  setQuantity,
  selectBetTypes,
  selectBetQuantity,
  selectBetToken,
  selectBalance,
  selectLockedBets,
  changeBalance, //TODO: remove this later
} from '../../reducers/PlaceBets';

import { placeBets } from '../../sagas/GameState/actions';
import { selectPlacingBet } from '../../sagas/GameState/reducer';

import BetSquare from './BetSquare';
import BetChips from './BetChips';
import squares from './squares';

 let message = [];


const BettingGrid = props => {


  return(

    <React.Fragment>
        <article>
          <div className="container">
            <div className="row">
              <div className="col-xs-5">
                {/* <div className="head-block-div"> */}

                  <div className="info-box-div">
                    <table className="info-box-div-table1" cellPadding="0" cellSpacing="0" width="100%">
                      <tbody>
                        <tr>

                        <BetSquare key={squares[0].betType} Msg={message[0]}  {...squares[0]} {...props}/>

                        <td width="7%" className="m-line"><span></span></td>

                        <BetSquare key={squares[1].betType} Msg={message[1]} {...squares[1]} {...props}/>

                        </tr>

                      </tbody>
                    </table>
                  </div>
                {/* </div> */}
              </div>

              <div className="col-xs-2 mid-c-main-div">
                    <BetSquare key={squares[2].betType} Msg={message[2]}  {...squares[2]} {...props}/>
              </div>

              <div className="col-xs-5">
              {/* <div className="head-block-div"> */}

                <div className="info-box-div">
                  <table className="info-box-div-table2" cellPadding="0" cellSpacing="0" width="100%">
                    <tbody>
                      <tr>

                        {/*<BetSquare key={document.body. clientWidth<=460 ? squares[4].betType : squares[3].betType} Msg={document.body. clientWidth<=460 ?message[4]:message[3]}  {...document.body. clientWidth<=460 ? squares[4] : squares[3]} {...props}/>*/}
                        <BetSquare key={squares[3].betType} Msg={message[3]}  {...squares[3]} {...props}/>

                        <td width="7%" className="m-line"><span></span></td>

                        {/*<BetSquare key={document.body. clientWidth<=460 ? squares[3].betType : squares[4].betType} Msg={document.body. clientWidth<=460 ?message[3]:message[4]}  {...document.body. clientWidth<=460 ? squares[3] : squares[4]} {...props}/>*/}
                        <BetSquare key={squares[4].betType} Msg={message[4]}  {...squares[4]} {...props}/>

                      </tr>
                    </tbody>
                  </table>
                </div>
              {/* </div> */}
              </div>
            </div>
        </div>
      </article>

      <BetChips{...props}/>
    </React.Fragment>
  )
}

const mapStateToProps = createStructuredSelector({
  selection:  selectBetTypes(),
  quantity:   selectBetQuantity(),
  token:      selectBetToken(),
  savingBet:  selectPlacingBet(),
});

function mapDispatchToProps(dispatch) {
  return {
    selectBet: (betType,quantity)  => dispatch(selectBet(betType,quantity)),
    cancelBet: ()         => dispatch(cancelBet()),
    makeBet:   (quantity) => dispatch(setQuantity(quantity,'EOS')),
    placeBets: (ref)         => dispatch(placeBets(ref)),
    setBalance:(delta)    => dispatch(changeBalance(delta)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BettingGrid);

function formatKeys(key, value) {
    switch (key) {
        case 'player':
            return (`PLAYER+${value} EOS`);
            break;
        case 'banker':
            return (`BANKER+${value} EOS`);
            break;
        case 'playerpair':
            return (`PLAYERPAIR+${value} EOS`);
            break;
        case 'bankerpair':
            return (`BANKERPAIR+${value} EOS`);
            break;
        case 'tie':
            return (`TIE+${value}EOS`);
            break;
        default:
            return (`Bet not sent. Please try again.`);
    }
}

function logMapElement(keyIterator, valueIterator, map, bettor) {
    // TODO: map User in notification to actual user
    let notification = `${bettor}beton`;
    for (var i = 0; i < map.size; i++) {
        notification += formatKeys(keyIterator.next().value, valueIterator.next().value);
        if (i < map.size - 1) {
            notification += ', ';
        }
    }
    return notification;
}
function messagename(msg) {
    let ideneity= msg.slice(msg.indexOf('beton')+5,msg.indexOf('+'));
    let amount = msg.slice(msg.indexOf('+')+1,msg.indexOf('EOS'));
    let notify = msg.slice(0,msg.indexOf('beton'))+' + '+amount+'EOS';
    const time = 5000;
    // let notifyQueue=[];
    // notifyQueue.push(msg);
    // // while(notifyQueue.length){
        // let msgsend = notifyQueue.shift();
        if(amount>=200){
            switch (ideneity) {
                case 'PLAYERPAIR':
                    message[0]=notify;
                    setTimeout(function () {message[0]=''},time);
                    break;
                case 'PLAYER':
                    message[1]=notify;
                    setTimeout(function () {message[1]=''},time);
                    break;
                case 'TIE':
                    message[2]=notify;
                    setTimeout(function () {message[2]=''},time);
                    break;
                case 'BANKER':
                    message[3]=notify;
                    setTimeout(function () {message[3]=''},time);
                    break;
                case 'BANKERPAIR':
                    message[4]=notify;
                    setTimeout(function () {message[4]=''},time);
                    break;

            }

        }
    // }
    // return message;
}
export function msgNotifier({ message,  bettor = 'You'}) {

    if(message && bettor !== 'You') {
        let keyIterator =  message.keys();
        let valueIterator = message.values();
        let messageFormatted = logMapElement(keyIterator, valueIterator, message, bettor);
        messagename(messageFormatted);
         // message= messageFormatted;

    }

}