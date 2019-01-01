import React from 'react';
import ReactNotify from 'react-notify';
import ReactModal from 'react-modal';
import '../../css/react-notify.css';
import { withNamespaces, NamespacesConsumer, Trans } from 'react-i18next';
import Clipboard from 'react-clipboard.js';
import { msgNotifier } from '../../components/BettingGrid';

let openSnackbarFn;
let openAlertFn;
let processMessages;
class Notifier extends React.Component {
  constructor () {
    super();
    this.state = {
      showModal: false,
      copySuccess: false
    };
    this.onCopy = this.onCopy.bind(this);
    this.alertText = '';
    this.alertType = null;
    this.messages=[];
    this.mobilemessages=[];
    this.x = 7;
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  onCopy(){
    this.state.copySuccess = "Copied!";
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false, copySuccess: false });
  }

  copyToClipboard = () => {
    let el = document.createElement('textarea');
    el.value = this.alertText;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.setState({ copySuccess: true });
  };


  componentDidMount() {
    openSnackbarFn = this.openSnackbar;
    openAlertFn = this.openAlert;
    processMessages = () => {
      if(this.messages.length && window.innerWidth>=768){
        this.refs.notificator.success('', this.messages.shift(), 20000);
      }
      if(this.mobilemessages.length && this.x>=7 && window.innerWidth<768){
        this.refs.mnotificator.success('', this.mobilemessages.shift(), 5000);
        this.x=0;
      }
      this.x++;
      setTimeout(processMessages, 200);
    }
    processMessages();
  }

  openSnackbar = (message) => {
    if(this.messages.length<=10){
      this.messages.push(message);
    }
    if(this.mobilemessages.length<=2){
      this.mobilemessages.push(message);
    }
    // this.refs.notificator.success('', this.messages.shift(), 5000);
  };

  openAlert = (message,type) => {
    this.alertText = message;
    this.alertType = type;
    
    this.handleOpenModal();
    // this.refs.personal.success('', message, 5000);
  };

  render() {
        return (
          <React.Fragment>
          <div className="left-fixed-div">
            <ReactNotify ref='notificator'/>
          </div>
          <div className="mobilenotifications">
            <ReactNotify ref='mnotificator'/>
          </div>
          {/* <div className="right-fixed-alerts">
            <ReactNotify ref='personal'/>
          </div> */}
          <div>
          {/* <button onClick={this.testNotifications}>Test Notifications</button> */}

          <ReactModal className="Modal" closeTimeoutMS={200} onRequestClose={this.handleCloseModal} shouldCloseOnOverlayClick={true} overlayClassName="Overlay" isOpen={this.state.showModal} contentLabel="Minimal Modal Example">
            {this.alertType==='error' ? (<h2>Oops!</h2>) : (<h2><Trans i18nKey="referral.label"></Trans></h2>)}
            {this.alertType === 'ref' ? (<div class="copy"><input type='text' disabled='true' value={this.alertText} /><Clipboard option-text={this.alertText} onSuccess={this.onCopy} data-clipboard-text={this.alertText}><img src={require('../../images/copy-content.png')} /></Clipboard> {this.state.copySuccess}</div>) : (<p>{this.alertText}</p>)}
            <button onClick={this.handleCloseModal}>Close</button>
        </ReactModal>
      </div>
          </React.Fragment>
    );
  }
}

function formatKey(key, value) {
  switch (key) {
    case 'player':
      return (`P ${value} EOS`);
      break;
    case 'banker':
      return (`B ${value} EOS`);
      break;
    case 'playerpair':
      return (`PP ${value} EOS`);
      break;
    case 'bankerpair':
      return (`BP ${value} EOS`);
      break;
    case 'tie':
      return (`T ${value} EOS`);
      break;
    default:
      return (`Bet not sent. Please try again.`);
  }
}


function logMapElements(keyIterator, valueIterator, map, bettor) {
  // TODO: map User in notification to actual user
  let notification = `${bettor} bet on `;
  for (var i = 0; i < map.size; i++) {
    notification += formatKey(keyIterator.next().value, valueIterator.next().value);
    if (i < map.size - 1) {
      notification += ', ';
    }
  }
  return notification;
}

export function openSnackbar({ message, error, ref, bettor = 'You'}) {
  if(ref) {
    openAlertFn(ref,'ref');
  }
  if(error) {
    openAlertFn(error,'error');
  }
  if(message && bettor !== 'You') {
    let keyIterator =  message.keys();
    let valueIterator = message.values();
    let messageFormatted = logMapElements(keyIterator, valueIterator, message, bettor);

    openSnackbarFn(messageFormatted);
      msgNotifier({message: message, bettor: bettor});
  }
  return {type:'NOTIFICATION'};
}

export default Notifier;
