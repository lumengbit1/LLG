import ScatterJS from "scatterjs-core";
import Eos from "eosjs";
import fetchTimeout from "fetch-timeout";
import {
  all,
  fork,
  put,
  takeEvery,
  takeLatest,
  select
} from "redux-saga/effects";
import { List, Map } from "immutable";
import { openSnackbar } from "../../components/BetNotifications";

import {
  GET_CURRENT_GAME,
  GET_LEADERBOARD,
  GET_BALANCE,
  PLACE_BETS,
  GET_IDENTITY,
  SET_SCATTER,
  SET_STATUS,
  STAKE_LLG,
  CLAIM_LLG,
  NODE_CHOOSE
} from "./constants";
import {
  setCurrentGame,
  setLeaderboard,
  placedBets,
  setResults,
  setIdentity,
  setAccount,
  setClient,
  setStatus,
  setRoadmap,
  setLimit
} from "./actions";
import {
  selectCurrentGame,
  selectStatus,
  selectAudio,
  selectPrevGame,
  selectPlacingBet,
  selectScatter,
  selectIdentity,
  selectClient,
  selectNode
} from "./reducer";
import {
  selectBetTypes,
  selectBetQuantity,
  selectBetToken,
  cancelBet,
  setBets,
  changeBalance,
  selectLockedBets,
  setResult
} from "../../reducers/PlaceBets";

//TODO: get ENV working
let API_URL = "https://api.lelego.io";
let NODE_PORT = 443;
let NODE_HTTP = "https";
let NODE_HOST = "api.eosbeijing.one";
const CHAIN_ID =
  "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906";
const CONTRACT = "llgcontract1";
const TOKEN = "llgonebtotal";

// const API_URL = "http://52.193.47.50:8080";
// let NODE_PORT = 8888;
// let NODE_HTTP = "http";
// let NODE_HOST = "52.193.47.50";
// const CHAIN_ID =
//   "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f";
// const CONTRACT = "llgcontract1";
// const TOKEN = "llgonebtotal";

function* sleep(time) {
  yield new Promise(resolve => setTimeout(resolve, time));
}

function* getAccount() {
  //const scatter = yield select(selectScatter());
  const client = yield select(selectClient());
  const identity = yield select(selectIdentity());

  const tableType = (name, scope) => {
    return {
      json: true,
      scope: scope,
      code: TOKEN,
      table: name,
      limit: 500
    };
  };

  const dividendtableType = (name, scope, code) => {
    return {
      json: true,
      scope: scope,
      code: code,
      table: name,
      limit: 1000
    };
  };

  try {
    if (client && identity) {
      const account = yield client.getAccount(identity.name);
      const currency = yield client.getCurrencyBalance(
        "eosio.token",
        identity.name
      );
      const dividendbalance = yield client.getCurrencyBalance(
        "eosio.token",
        "llg4dividend"
      );
      const circulation = yield client.getCurrencyBalance(
        "llgonebtotal",
        "llg4release1"
      );
      //TODO: Dean, we can move this into something that only makes requests while the modal is open
      //if we want to remove network calls
      const stake = yield client.getTableRows(
        tableType("stake", identity.name)
      );

      const history = yield client.getTableRows(
        tableType("history", identity.name)
      );
      //DEAN-TODO: this stake entry also has updated_on and last_claim
      //both of these are "linux day" unix timestamp / (24*3600)
      //updated_on is the day that his stake was last updated
      //last_claim is the last claimed dividend from the dividends array below
      const refund = yield client.getTableRows(
        tableType("refund", identity.name)
      );
      //DEAN-TODO: refund also has updated_on which is linux timestamp in seconds
      //this will be available in their liquid balance 72 hours from this date
      const llg = yield client.getCurrencyBalance(TOKEN, identity.name);

      //DEAN-TODO: this dividends table has the current float and all dividends in an array
      //dividends.rows[0].reserve is the current float
      //dividends.rows[0].dividends is an array of objects {record_date,details:{dividend,total_stake}}
      //record date is unix timestamp / (24*3600) i.e. the linux day
      //details.dividend is the total dividend in EOS
      //details.total_stake is the total stake on that day in LLG
      //"todays dividend" is the "limit" in state (excluding the multiplier) minus reserve
      const dividends = yield client.getTableRows(
        tableType("dividends", TOKEN)
      );

      const dividendshare = yield client.getTableRows(
        dividendtableType("dividend", "dividend", "llgconfigure")
      );

      const total_llg = yield client.getCurrencyStats(TOKEN, "LLG");

      const data = {
        ...account,
        eos: currency[0] ? Number(currency[0].split(" ")[0]) : 0,
        circulation: circulation[0] ? Number(circulation[0].split(" ")[0]) : 0,
        stake:
          stake.rows && stake.rows.length
            ? Number(stake.rows[0].quantity.split(" ")[0])
            : 0,
        refund:
          refund.rows && refund.rows.length
            ? Number(refund.rows[0].quantity.split(" ")[0])
            : 0,
        llg: llg.length ? Number(llg[0].split(" ")[0]) : 0,
        dividendbalance: dividendbalance[0]
          ? Number(dividendbalance[0].split(" ")[0])
          : 0,
        total_stake:
          dividends.rows && dividends.rows.length
            ? Number(dividends.rows[0].total_stake.split(" ")[0])
            : 0,
        total_llg: total_llg.LLG
          ? Number(total_llg.LLG.supply.split(" ")[0])
          : 0,
        reserve:
          dividends.rows && dividends.rows.length
            ? Number(dividends.rows[0].reserve.split(" ")[0])
            : 0,
        all_dividends: dividends.rows ? dividends.rows[0] : {},
        all_stakes: stake.rows ? stake.rows : {},
        last_claim: stake.rows ? stake.rows : {},
        last_refund: refund.rows ? refund.rows[0] : {},
        history: history ? history.rows : {},
        last_dividend:
          dividends.rows && dividends.rows.length
            ? Number(
                dividends.rows[0].dividends
                  .slice(-1)[0]
                  .details.dividend.split(" ")[0]
              )
            : 0,
        last_stake:
          dividends.rows && dividends.rows.length
            ? Number(
                dividends.rows[0].dividends
                  .slice(-1)[0]
                  .details.total_stake.split(" ")[0]
              )
            : 0,
        dividendpoolshare:
          dividendshare.rows &&
          dividendshare.rows.length &&
          dividendshare.rows[1].destination === "llg4dividend"
            ? Number(dividendshare.rows[1].share) / 100
            : 0
      };
      yield put(setAccount(data));
    }
  } catch (err) {
    console.error(err);
  }
}

function* sendStake(action) {
  const client = yield select(selectClient());
  const identity = yield select(selectIdentity());

  try {
    let transaction = [];
    transaction.push({
      account: TOKEN,
      name: action.stake ? "stake" : "unstake",
      data: {
        owner: identity.name,
        quantity: `${Number(action.quantity)
          .toFixed(4)
          .toString()} LLG`
      }
    });

    const actions = transaction.map(tx => {
      return {
        ...tx,
        authorization: [
          { actor: identity.name, permission: identity.authority }
        ]
      };
    });
    console.log(
      `Attempting to send tx to scatter: ${JSON.stringify(actions, null, 2)}`
    );
    const res = yield client.transaction({ actions });

    //put a success message here
  } catch (err) {
    //err=JSON.parse(err);
    //console.error(err);
    //if(err.error && err.error.name === "tx_cpu_usage_exceeded"){
    //  yield put(openSnackbar({error: 'CPU usage limit exceeded. Please stake more EOS to continue playing.'}));
    //} else {
    yield put(openSnackbar({ error: "Unable to stake. Please try again." }));
    //}
  }
}

function* sendClaim() {
  const client = yield select(selectClient());
  const identity = yield select(selectIdentity());

  try {
    let transaction = [];
    transaction.push({
      account: TOKEN,
      name: "claim",
      data: {
        owner: identity.name
      }
    });

    const actions = transaction.map(tx => {
      return {
        ...tx,
        authorization: [
          { actor: identity.name, permission: identity.authority }
        ]
      };
    });
    console.log(
      `Attempting to send tx to scatter: ${JSON.stringify(actions, null, 2)}`
    );
    const res = yield client.transaction({ actions });

    //put a success message here
  } catch (err) {
    //err=JSON.parse(err);
    //console.error(err);
    //if(err.error && err.error.name === "tx_cpu_usage_exceeded"){
    //  yield put(openSnackbar({error: 'CPU usage limit exceeded. Please stake more EOS to continue playing.'}));
    //} else {
    yield put(openSnackbar({ error: "Unable to stake. Please try again." }));
    //}
  }
}

function* sendBets(action) {
  const betTypes = yield select(selectBetTypes());
  const currGame = yield select(selectCurrentGame());
  const lockedBets = yield select(selectLockedBets());
  const client = yield select(selectClient());
  const identity = yield select(selectIdentity());

  try {
    let transaction = [];
    const ref = action.referrer ? `:${action.referrer}` : "";
    const bets = betTypes.map((quantity, betType) => {
      transaction.push({
        account: "eosio.token",
        name: "transfer",
        data: {
          from: identity.name,
          to: CONTRACT,
          memo: `${
            currGame ? currGame.drawId : "invalid"
          }:${betType.toLowerCase()}${ref}`, //TODO: remove testing
          quantity: `${Number(quantity)
            .toFixed(4)
            .toString()} EOS`
        }
      });
      return { bettor: "self", quantity, token: "EOS", betType };
    });

    const actions = transaction.map(tx => {
      return {
        ...tx,
        authorization: [
          { actor: identity.name, permission: identity.authority }
        ]
      };
    });
    console.log(
      `Attempting to send tx to scatter: ${JSON.stringify(actions, null, 2)}`
    );
    // try{
    const res = yield client.transaction({ actions });
    //update bet display
    const newBets = lockedBets.concat(bets);
    console.log(newBets);

    yield put(cancelBet());
    yield put(setBets(newBets));
    yield put(placedBets());
    // }catch(error){
    //     if(error && error.type === "signature_rejected"){
    //         yield put(cancelBet());
    //         yield put(placedBets());
    //     }
    //   let err=JSON.parse(error);
    //   console.log('error',err.error.what)
    // }
  } catch (err) {
    console.log("err", err);
    if (err && err.type === "signature_rejected") {
      yield put(cancelBet());
      yield put(placedBets());
    } else {
      err = JSON.parse(err);
      console.error(err);
      yield put(placedBets());
      if (err.error && err.error.name === "tx_cpu_usage_exceeded") {
        yield put(
          openSnackbar({
            error:
              "CPU usage limit exceeded. Please stake more EOS to continue playing."
          })
        );
      } else if (
        err.error &&
        err.error.what === "eosio_assert_message assertion failure"
      ) {
        yield put(
          openSnackbar({ error: "Exceed the limit. Please try again." })
        );
      } else {
        yield put(
          openSnackbar({ error: "Unable to send bet. Please try again." })
        );
      }
    }
  }
}

function* getIdentity(action) {
  const scatter = yield select(selectScatter());
  const identity = yield select(selectIdentity());
  try {
    const networkConfig = {
      protocol: NODE_HTTP,
      blockchain: "eos",
      host: NODE_HOST,
      port: NODE_PORT,
      chainId: CHAIN_ID
    };

    // suggest the network to the user
    yield scatter.suggestNetwork(networkConfig);

    // get identities specific to the activeNetwork
    if (action.reset) {
      yield scatter.forgetIdentity();
      if (identity) {
        yield put(setIdentity(null));
        return;
      }
    }

    const id = yield scatter.getIdentity({
      accounts: [
        {
          chainId: CHAIN_ID,
          blockchain: "eos"
        }
      ]
    });

    const match = id && id.accounts.find(x => x.blockchain === "eos");
    yield put(setIdentity(match));
    yield fork(getAccount);
  } catch (err) {
    console.error(err);
  }
}

// function* revealGame(drawId) {
//   try {
//     //const currGame = yield select(selectCurrentGame());
//     console.log(`GETTING DRAW FOR: ${drawId}`);
//     if(drawId) {
//
//       const data = yield fetchTimeout(`${API_URL}/game/${drawId}`,{},2000,'Timeout getting game draw');
//       const result = yield data.json();
//       console.log(result);
//       if(result.length > 0) {
//         yield put(setResults(result[0]));
//         console.log("Got results");
//       } else {
//         yield sleep(500);
//         yield fork(revealGame,drawId);
//         console.log("Empty results - retrying");
//       }
//     }
//   } catch(err) {
//     yield sleep(500);
//     yield fork(revealGame,drawId);
//   }
// }

function* getRoadmap() {
  console.log("GETTING ROADMAP");
  const currGame = yield select(selectCurrentGame());
  try {
    //update roadmaps
    const roadmap = yield fetchTimeout(
      `${API_URL}/roadmap/${currGame.deck}`,
      {},
      2000,
      "Timeout getting roadmap"
    );
    const roadmapData = yield roadmap.json();

    console.log("ROADMAP SUCCESS");
    console.log(roadmapData[0]);
    yield put(setRoadmap(roadmapData[0]));
  } catch (err) {
    console.log("RETRY ROADMAP");
    yield sleep(1000);
    yield fork(getRoadmap);
  }

  try {
    const client = yield select(selectClient());
    const currency = yield client.getCurrencyBalance(
      "eosio.token",
      "llgfundpoool"
    );
    // const currency = yield client.getCurrencyBalance('eosio.token', 'llg4dividend');
    yield put(setLimit(Number(currency[0].split(" ")[0])));
  } catch (err) {
    //do nothing
    console.log(err);
  }
}

// function* getTime() {
//   console.log('GETTING TIME SYNC');
//   const currGame = yield select(selectCurrentGame());
//   try {
//     //get real time
//     const chain = yield fetchTimeout(`${NODE_URL}/v1/chain/get_info`,{},2000,'Timeout getting time sync');
//     const chainData = yield chain.json();
//     let newTime = new Date(`${chainData.head_block_time}Z`);
//     console.log(`Current server time: ${newTime}`)
//     console.log(`Current local time: ${new Date()}`)
//     const {currTime, ...otherGame} = currGame;
//     const game = {
//       ...otherGame,
//       currTime: newTime.getTime()
//     }
//     console.log('TIME SUCCESS');
//     yield put(setCurrentGame(game));
//   } catch(err) {
//     console.log('RETRY TIME');
//     yield sleep(500);
//     yield fork(getTime);
//   }
// }

function eosHelper(value) {
  return value ? Number(value.split(" ")[0]) : 0;
}

function* getGame() {
  try {
    const currGame = yield select(selectCurrentGame());
    const status = yield select(selectStatus());
    const identity = yield select(selectIdentity());
    const audio = yield select(selectAudio());
    // nodechoose = yield select(selectNode());
    // console.log('nodechoose',nodechoose);

    if (status === "init") {
      yield put(setStatus("betting"));
    }

    if (status === "drawing") {
      // don't get new game if we are drawing right now
      return;
    }

    const data = yield fetchTimeout(
      API_URL + "/gameTable",
      {},
      2000,
      "Timeout getting game table"
    );
    const result = yield data.json();

    // let betsList = result ? result.bets : [];
    const betsList = result ? result.bets : [];
    const currBets = currGame ? currGame.allBets : [];
    // betsList = currBets.concat(randomBets(Math.ceil(Math.random()*3)));

    if (currBets.length < betsList.length) {
      console.log("NEW BETS");
      const latestBet = betsList.slice(currBets.length);
      latestBet.map(bet => {
        let message = Map().set(
          bet.bet_type,
          Number(bet.quantity.quantity.split(" ")[0])
        );
        put(openSnackbar({ message: message, bettor: bet.bettor }));
        // put(msgNotifier({message: message, bettor: bet.bettor}));
      });
    }

    // don't set bet if we are drawing, this will cause bet to be placed again after being cleared when revealing cards
    if (identity && status !== "drawing") {
      const ourBets = betsList.filter(b => b.bettor === identity.name);
      if (ourBets.length > 0) {
        const newBets = ourBets.map(bet => {
          return {
            bettor: "self",
            quantity: Number(bet.quantity.quantity.split(" ")[0]),
            token: "EOS",
            betType: bet.bet_type
          };
        });
        const listBets = List().concat(newBets);
        yield put(setBets(listBets));
      }
    }

    const game = {
      deck: result.deck,
      drawId: result.hand_id,
      betsId: result.bets_id,
      playerBets: eosHelper(result.player_bets),
      bankerBets: eosHelper(result.banker_bets),
      tieBets: eosHelper(result.tie_bets),
      playerPairBets: eosHelper(result.player_pair_bets),
      bankerPairBets: eosHelper(result.banker_pair_bets),
      currTime: result.curr_time / 1000,
      drawTime: result.draw_time / 1000,
      allBets: result.bets,
      frozen: result.frozen === 1
    };

    const drawId = currGame ? currGame.drawId : null;
    console.log("Get game");

    const draw = yield fetchTimeout(
      `${API_URL}/game/${drawId}`,
      {},
      2000,
      "Timeout getting game draw"
    );
    const drawResult = yield draw.json();

    if (
      drawResult.length > 0 &&
      drawId !== game.drawId &&
      status !== "drawing"
    ) {
      console.log("Game CHANGED - getting updates");
      if (drawId) {
        yield put(setStatus("drawing"));
        yield put(setResults(drawResult[0]));
        // wait for drawing to complete before setting next game
        // setting new game too early will cause board state to clear before the drawing animation
        yield sleep(10000);
        game.currTime = game.currTime + 10000;
      }
      yield put(setResult(null));
    }

    yield put(setCurrentGame(game));
  } catch (err) {
    console.error(err);
  }
}

function* getLeaderboard() {
  try {
    const leaderboard = yield fetchTimeout(
      `${API_URL}/leaderboard`,
      {},
      5000,
      "Timeout getting dailyLeaderboard"
    );
    const leaderboardData = yield leaderboard.json();
    yield put(setLeaderboard(leaderboardData));
  } catch (err) {
    console.error(err);
  }
}

// function randomBets(j = 10) {
//   let bets = [];
//   let betTypes = ["player", "banker", "tie", "bankerpair", "playerpair"];
//   let bettorNames = ["Renae", "Talitha", "Mackenzie", "Matthew", "Latanya", "Ngoc", "Becki", "Janae", "Sueann", "Rosetta", "Ayesha", "Retha", "Margeret", "Bettie", "Starla", "Norah", "Loyce", "Jong", "Amie", "Antonette", "Latosha", "Lamont", "Louis", "Hilda", "Shala", "Elton", "Mariella", "Verla", "Michael", "Greg", "Selena", "Latoria", "Tonette", "Neda", "Lanie", "Leslie", "Tonie", "Andria", "Adelaide", "Jesusa", "Clarence", "Shavonne", "Joesph", "Keturah", "Oswaldo", "Cassaundra", "Homer", "Eleonora", "Etta", "Vernice"];

//   for (let i = 0; i < j; i++) {
//     let bet = {
//       bettor: bettorNames[Math.floor(Math.random() * bettorNames.length)],
//       quantity: { quantity: Math.floor(Math.random() * 100) + ".0000 EOS" },
//       bet_type: betTypes[Math.floor(Math.random() * betTypes.length)]
//     }
//     bets.push(bet)
//   }
//   return bets;
// }

function* makeClient() {
  const scatter = yield select(selectScatter());
  try {
    if (scatter) {
      const networkConfig = {
        protocol: NODE_HTTP,
        blockchain: "eos",
        host: NODE_HOST,
        port: NODE_PORT,
        chainId: CHAIN_ID
      };

      const networkOptions = {
        broadcast: true,
        sign: true,
        chainId: CHAIN_ID
      };

      const client = scatter.eos(
        networkConfig,
        Eos,
        networkOptions,
        networkConfig.protocol
      );
      yield put(setClient(client));
    }
  } catch (err) {
    console.error(err);
  }
}

function* updateByStatus() {
  const status = yield select(selectStatus());
  const currGame = yield select(selectCurrentGame());
  console.log(`STATUS CHANGE: ${status}`);
  try {
    if (status === "drawing") {
      // const drawId = currGame ? currGame.drawId : null;
      // yield fork(revealGame,drawId);
      yield put(cancelBet());
      yield sleep(10000);
      yield put(setStatus("betting"));
    }
    if (status === "betting") {
      yield fork(getRoadmap);
    }
  } catch (err) {
    console.error(err);
  }
}

function* updateNode() {
  try {
    let nodeaddress = yield select(selectNode());
    console.log("nodeaddress", nodeaddress);
    if (nodeaddress.split(":").length - 1 == 2) {
      NODE_HTTP = nodeaddress.slice(0, nodeaddress.indexOf(":"));
      NODE_HOST = nodeaddress.slice(
        nodeaddress.indexOf(":") + 3,
        nodeaddress.lastIndexOf(":")
      );
      NODE_PORT = nodeaddress.slice(nodeaddress.lastIndexOf(":") + 1);
    } else {
      console.error("Address Format Error.");
    }
    yield getIdentity();
    yield makeClient();
  } catch (err) {
    console.error(err);
  }
}

function* watchGetGame() {
  yield takeEvery(GET_CURRENT_GAME, getGame);
}

function* watchGetBalance() {
  yield takeEvery(GET_BALANCE, getAccount);
}

function* watchGetLeaderboard() {
  yield takeEvery(GET_LEADERBOARD, getLeaderboard);
}

function* watchIdentity() {
  yield takeLatest(GET_IDENTITY, getIdentity);
  // yield takeEvery(GET_IDENTITY, getIdentity)
}

function* watchPlaceBets() {
  yield takeLatest(PLACE_BETS, sendBets);
}

function* watchMakeClient() {
  yield takeLatest(SET_SCATTER, makeClient);
  // yield takeEvery(SET_SCATTER, makeClient)
}

function* watchStatus() {
  yield takeLatest(SET_STATUS, updateByStatus);
}

function* watchStake() {
  yield takeLatest(STAKE_LLG, sendStake);
}

function* watchClaim() {
  yield takeLatest(CLAIM_LLG, sendClaim);
}
function* watchNode() {
  yield takeLatest(NODE_CHOOSE, updateNode);
}
export default function* root() {
  yield all([
    fork(watchGetGame),
    fork(watchGetBalance),
    fork(watchGetLeaderboard),
    fork(watchPlaceBets),
    fork(watchIdentity),
    fork(watchMakeClient),
    fork(watchStatus),
    fork(watchStake),
    fork(watchClaim),
    fork(watchNode)
  ]);
}
