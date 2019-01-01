import React from "react";
import { List } from "immutable";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import { Preload } from "react-preload";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  getIdentity,
  toggleAudio,
  stakeLLG,
  claimLLG,
  setNode
} from "../../sagas/GameState/actions";
import {
  selectLimit,
  selectCurrentGame,
  selectLeaderboard,
  selectAudio,
  selectRoadmap,
  selectResult as selectDraw,
  selectIdentity,
  selectAccount,
  selectScatter,
  selectStatus,
  selectStatusTime,
  selectNode,
  selectDaily
} from "../../sagas/GameState/reducer";
import {
  selectBalance,
  selectLockedBets,
  selectShowResult,
  selectResult,
  setBets,
  setResult,
  hideResult,
  changeBalance //TODO: remove this later
} from "../../reducers/PlaceBets";

import Header from "../Header";
import BetNotifications, { openSnackbar } from "../BetNotifications";
import Dividends, { openDividend } from "../Dividends";
import Dailyleaderboard, { openDailyleaderboard } from "../dailyLeaderboard";

//import MemberNames from '../MemberNames';
import Summary from "../Summary";
import GameTable from "../GameTable";
import BettingGrid from "../BettingGrid";
import RoadMaps from "../RoadMaps";
import Maintenance from "../Maintenance";

import bg from "../../images/body-bg.jpg";
import mainbg from "../../images/bg-img.jpg";
import { Repeat } from "immutable";

const showMaintenance = false;

const styles = theme => ({
  "@global": {
    body: {
      //backgroundColor: theme.palette.grey[900],
      backgroundImage: `url(${bg})`,
      backgroundRepeat: "repeat",
      backgroundSize: "cover"
    }
  },
  layout: {
    width: "auto"
  },
  bettingGrid: {
    marginTop: theme.spacing.unit * 2
  }
});

function Pricing(props) {
  const { classes, ...otherProps } = props;
  //console.log(otherProps);
  const loading = <CircularProgress size={48} />;
  const suits = ["clubs", "diamonds", "hearts", "spades"];
  const ranks = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K"
  ];

  const cards = [].concat.apply(
    [],
    suits.map(c => {
      return ranks.map(r => {
        const suffix = ["A", "J", "Q", "K"].indexOf(r) !== -1 ? "png" : "svg";
        const cardName = require(`../../images/${c}${r}.${suffix}`);
        return cardName;
      });
    })
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <Header
        identity={otherProps.identity}
        getIdentity={otherProps.getIdentity}
        scatter={otherProps.scatter}
        toggleAudio={otherProps.toggleAudio}
        audio={otherProps.audio}
        modal={otherProps.notification}
        dividend={otherProps.dividend}
        dailyleaderboard={otherProps.dailyleaderboard}
        menu={otherProps.menu}
        nodeChoose={otherProps.setNode}
        nodechosen={otherProps.node}
      />
      {showMaintenance && <Maintenance />}
      <Dividends {...otherProps} />
      <Dailyleaderboard {...otherProps} />
      <BetNotifications />
      <main className={classes.layout}>
        <Preload
          images={cards}
          loadingIndicator={loading}
          autoResolveDelay={3000}
        >
          <React.Fragment>
            <Summary {...otherProps} />
            <GameTable {...otherProps} />
            <div className={classes.bettingGrid}>
              <BettingGrid {...otherProps} />
            </div>
            <RoadMaps {...otherProps} />
          </React.Fragment>
        </Preload>
      </main>
    </React.Fragment>
  );
}

const mapStateToProps = createStructuredSelector({
  currentGame: selectCurrentGame(),
  leaderboard: selectLeaderboard(),
  roadmaps: selectRoadmap(),
  limit: selectLimit(),
  audio: selectAudio(),
  balance: selectAccount(),
  lockedBets: selectLockedBets(),
  showResult: selectShowResult(),
  results: selectResult(),
  draw: selectDraw(),
  identity: selectIdentity(),
  scatter: selectScatter(),
  status: selectStatus(),
  statusTime: selectStatusTime(),
  node: selectNode(),
  dailyData: selectDaily()
});

function mapDispatchToProps(dispatch) {
  return {
    setBalance: delta => dispatch(changeBalance(delta)),
    getIdentity: reset => dispatch(getIdentity(reset)),
    toggleAudio: () => dispatch(toggleAudio()),
    setResult: result => dispatch(setResult(result)),
    hideResult: result => dispatch(hideResult(result)),
    clearLockedBets: () => dispatch(setBets(List())),
    dividend: message => dispatch(openDividend()),
    notification: message => dispatch(openSnackbar(message)),
    stakeLLG: (quantity, stake) => dispatch(stakeLLG(quantity, stake)),
    claimLLG: () => dispatch(claimLLG()),
    setNode: node => dispatch(setNode(node)),
    dailyleaderboard: () => dispatch(openDailyleaderboard())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withStyles(styles),
  withConnect
)(Pricing);
