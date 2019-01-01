import React from "react";
import { withNamespaces, NamespacesConsumer, Trans } from "react-i18next";
import ping from "web-ping";
import ActivityModal from "./activityModal";

// import { toggleAudio } from '../../sagas/GameState/reducer';
// const styles = theme => ({
//   appBar: {
//     position: 'relative',
//   },
//   toolbarTitle: {
//     flex: 1,
//   }
// });
let menuOpen = false;
let audioPlay = true;
// let delayname=[];
// let dalaytime=[];
let delaytime = new Object();
let menuSig = false;
const HOST = [
  "https://api.eosbeijing.one:443",
  "https://eos.greymass.com:443",
  "https://mainnet.eoscannon.io:443",
  "https://api.eosnewyork.io:443",
  "https://node1.zbeos.com:443"
];
let host = null;

const Header = props => {
  let {
    classes,
    identity,
    language,
    scatter,
    audio,
    t,
    i18n,
    nodechosen
  } = props;

  const menuSigToggle = () => {
    menuSig = !menuSig;
    Ping(HOST);
  };

  const menuToggle = () => {
    menuOpen = !menuOpen;
  };
  // const toggleAudio = () => {
  // //   toggleAudio = !toggleAudio;
  // }
  const changeLanguage = lng => {
    props.i18n.changeLanguage(lng);
  };

  const Ping = hosts => {
    // ping('http://54.64.210.239').then(function(delta) {
    //     console.log('Ping time was ' + String(delta) + ' ms');
    //     delaytime = delta;
    // }).catch(function(err) {
    //     console.error('Could not ping remote URL', err);
    // });
    hosts.map(host =>
      ping({ host }).then(function(delta) {
        console.log("Ping time was " + String(delta) + " ms");
        // delayname.push(host);
        // dalaytime.push(String(delta));
        delaytime[host] = String(delta);
        console.log("delaytime", delaytime);
      })
    );
  };

  const nodechoose = event => {
    host = event.target.innerText.split("--")[0];
    let hostchoose = "";
    HOST.map(item => {
      if (item.substring(0, item.lastIndexOf(":")) === host) {
        hostchoose = item;
      }
    });

    if (hostchoose.length > 0) {
      props.nodeChoose(hostchoose);
    }
  };

  const refLink = `https://play.lelego.io/?r=${
    identity ? identity.name : "signin"
  }`;
  return (
    <header>
      <div className="container">
        <div className="row">
          <div className="col-xs-3 logo-div">
            <img
              src={require("../../images/logo.png")}
              width="111"
              height="34"
            />
          </div>
          <div className="col-xs-9">
            <div className="right-div">
              <ActivityModal />
              {"\xa0\xa0"}
              {props.audio ? (
                <img
                  className="sound"
                  src={require("../../images/sound.svg")}
                  onClick={() => props.toggleAudio()}
                  width="15"
                  height="15"
                />
              ) : (
                <img
                  src={require("../../images/sound.svg")}
                  className="sound nosound"
                  onClick={() => props.toggleAudio()}
                  width="15"
                  height="15"
                />
              )}
              {/*<img className="languageicon"  src={require(`../../images/language.svg`)}onClick={props.i18n.language=='en'?() => changeLanguage('zh'):() => changeLanguage('en')}/>*/}
              {/*<a onClick={()=>Ping()}>Ping</a>*/}
              {"\xa0\xa0"}
              <img
                className="nodechoose"
                src={require(`../../images/choose node.svg`)}
                onClick={() => menuSigToggle()}
                width="18"
                height="18"
              />
              <span>&nbsp;</span>
              {props.i18n.language == "en" ? (
                <img
                  src={require("../../images/zh.svg")}
                  className="languageicon"
                  onClick={() => changeLanguage("zh")}
                />
              ) : (
                <img
                  src={require("../../images/en.svg")}
                  className="languageicon"
                  onClick={() => changeLanguage("en")}
                />
              )}
              {menuSig ? (
                <React.Fragment>
                  {/*<ul className={menuSig ? 'aaccountmenu open ' : 'accountmenu'}>*/}
                  {/*<li><a className='identity'>{delaytime+'ms'}</a></li>*/}
                  {/*</ul>*/}
                  <ul className={menuSig ? "nodemenu open" : "nodemenu"}>
                    <li>
                      <a className="nodelist" />
                      <ul>
                        {HOST.map(name => (
                          <li
                            className={
                              props.nodechosen == name ? "nodelist" : ""
                            }
                          >
                            <a onClick={e => nodechoose(e)}>
                              {name.slice(0, name.lastIndexOf(":")) +
                                "--" +
                                delaytime[name] +
                                "ms"}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </React.Fragment>
              ) : (
                ""
              )}

              {scatter ? (
                <React.Fragment>
                  {/*{identity ? (<ul className={menuOpen ? 'accountmenu open' : 'accountmenu'}><li><a className='identity' onClick={() => menuToggle()}><span className='identity'><span className="welcome"><Trans i18nKey="welcome.label"></Trans></span> {identity.name} &#9662;</span></a><ul className="accountmenu-dropdown"><li><a onClick={()=>{props.dividend()}}><Trans i18nKey="claimdividend.label"></Trans></a></li><li><a onClick={()=>{props.modal({ref: refLink})}}><Trans i18nKey="referral.label"></Trans></a></li><li><a onClick={()=>{props.getIdentity(true)}}><Trans i18nKey="logout.label"></Trans> <img src={require(`../../images/logout.svg`)} alt='' /></a></li></ul></li></ul>) : (<a onClick={()=>{props.getIdentity()}}><Trans i18nKey="signin.label"></Trans></a>)}*/}
                  {identity ? (
                    <ul
                      className={menuOpen ? "accountmenu open" : "accountmenu"}
                    >
                      <li>
                        <a className="identity" onClick={() => menuToggle()}>
                          <span className="identity">
                            <span className="welcome">
                              <Trans i18nKey="welcome.label" />
                            </span>{" "}
                            {identity.name} &#9662;
                          </span>
                        </a>
                        <ul className="accountmenu-dropdown">
                          <li>
                            <a
                              onClick={() => {
                                props.dividend();
                              }}
                            >
                              <Trans i18nKey="claimdividend.label" />
                            </a>
                          </li>
                          <li>
                            <a
                              onClick={() => {
                                props.dailyleaderboard();
                              }}
                            >
                              <Trans i18nKey="leaderboard.label" />
                            </a>
                          </li>
                          <li>
                            <a
                              onClick={() => {
                                props.modal({ ref: refLink });
                              }}
                            >
                              <Trans i18nKey="referral.label" />
                            </a>
                          </li>
                          <li>
                            <a
                              onClick={() => {
                                props.getIdentity(true);
                              }}
                            >
                              <Trans i18nKey="logout.label" />{" "}
                              <img
                                src={require(`../../images/logout.svg`)}
                                alt=""
                              />
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  ) : (
                    <a
                      onClick={() => {
                        props.getIdentity();
                      }}
                    >
                      <Trans i18nKey="signin.label" />
                    </a>
                  )}
                  {/*{identity ? (<ul className={menuOpen ? 'accountmenu open' : 'accountmenu'}><li><img src={require("../../images/my account.svg")} width="20" height="20" className='identity' onClick={() => menuToggle()}></img><ul className="accountmenu-dropdown"><li><a onClick={()=>{props.dividend()}}><Trans i18nKey="claimdividend.label"></Trans></a></li><li><a onClick={()=>{props.modal({ref: refLink})}}><Trans i18nKey="referral.label"></Trans></a></li><li><a onClick={()=>{props.getIdentity(true)}}><Trans i18nKey="logout.label"></Trans> <img src={require(`../../images/logout.svg`)} alt='' /></a></li></ul></li></ul>) : (<a onClick={()=>{props.getIdentity()}}><Trans i18nKey="signin.label"></Trans></a>)}*/}
                </React.Fragment>
              ) : (
                <a href="https://get-scatter.com/" target="new">
                  <Trans i18nKey="getscatter.label" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
// const mapStateToProps = createStructuredSelector({
//   toggleAudio:  toggleAudio(),
// });

export default withNamespaces("translation")(Header);
