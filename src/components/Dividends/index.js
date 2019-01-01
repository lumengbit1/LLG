import React from "react";
import ReactNotify from "react-notify";
import ReactModal from "react-modal";
import "../../css/react-notify.css";
import { withNamespaces, NamespacesConsumer, Trans } from "react-i18next";
import PieChart from "react-minimal-pie-chart";

let openDividendFn;
class Notifier extends React.Component {
  constructor(props) {
    super();
    this.state = {
      showModal: false,
      copySuccess: false,
      input: 0,
      stake: true,
      balances: {
        staked: 0,
        stakeable: 0,
        total: 0
      },
      claim: 0,
      date: "",
      timeRemaining: "00:00:00" //Replace this with the actual dividend time call
    };
    this.dataMock = [
      { value: 0, color: "#333933" },
      { value: 10, color: "#B9AB94" }
    ];
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }

  updateTime() {
    //   const currTime = Date.now
    // const currTime = this.props.currentGame && this.props.currentGame.currTime ? this.props.currentGame.currTime : Date.now();
    // const diff = Date.now() - currTime;
    // const now = new Date(Date.now() + 43200000);
    const now = new Date();
    const UTCdate =
      now.getUTCDate() +
      "/" +
      (now.getUTCMonth() + 1) +
      "/" +
      now.getUTCFullYear();
    const timeDiff =
      86400000 - Math.floor(new Date(Date.now() + 43200000) % 86400000);
    this.dataMock = [
      { value: 86400000 - timeDiff, color: "#333933" },
      { value: timeDiff, color: "#B9AB94" }
    ];
    this.setState({
      timeRemaining: this.msToMS(timeDiff),
      date: UTCdate
    });
  }

  totalDividends(last, dividends, stakes) {
    let total = 0;
    let min = 0;
    let hs = { 0: 0 };
    if (last[0]) {
      let history = stakes.concat([
        {
          quantity: last[0].quantity.split(" ")[0],
          updated_on: last[0].updated_on
        }
      ]);
      history.forEach(h => {
        hs[h.updated_on] = 1 * h.quantity.split(" ")[0];
      });
      min = history[0].updated_on;
      dividends.forEach(d => {
        if (d.record_date > last[0].last_claim) {
          if (hs[d.record_date]) {
            min = d.record_date;
          }
          /* console.log("Date: " + d.record_date + ", TD: " + d.details.dividend.split(' ')[0] + ", TS: " + d.details.total_stake.split(' ')[0] + ", S: " + hs[min] + ", D: " + (d.details.dividend.split(' ')[0]/d.details.total_stake.split(' ')[0]*hs[min])) */ total +=
            (d.details.dividend.split(" ")[0] /
              d.details.total_stake.split(" ")[0]) *
            hs[min];
        }
      });
    }
    // console.log(total);
    return Number(total);
  }

  msToMS(duration, i = 24) {
    let milliseconds = parseInt((duration % 1000) / 100),
      seconds = parseInt((duration / 1000) % 60),
      minutes = parseInt((duration / (1000 * 60)) % 60),
      hours = parseInt((duration / (1000 * 60 * 60)) % i);
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return hours + ":" + minutes + ":" + seconds;
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  toggleStakeUnstake = () => {
    this.setState(prevState => ({ stake: !prevState.stake }));
  };

  updateInput(e) {
    console.log(e.target.value);
    this.setState({ input: e.target.value });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  componentDidMount() {
    openDividendFn = this.handleOpenModal;
    this.interval = setInterval(() => this.updateTime(), 133);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidUpdate() {
    //console.log(this.props);
    //this.state.balances.staked =
  }

  openAlert = (message, type) => {
    this.alertText = message;
    this.alertType = type;
    this.handleOpenModal();
    // this.refs.personal.success('', message, 5000);
  };

  render() {
    const stakeLLG = e => {
      //preventDefault(e);
      e.preventDefault();
      this.props.stakeLLG(this.state.input, this.state.stake);
      //console.log('replace with EOS stake');
    };

    const claimLLG = () => {
      this.props.claimLLG();
    };

    const dividends = this.props.balance
      ? JSON.stringify(
          this.totalDividends(
            this.props.balance.last_claim,
            this.props.balance.all_dividends.dividends,
            this.props.balance.history
          )
        )
      : "";
    const unstakeCooldown =
      this.props.balance &&
      this.props.balance.last_refund &&
      this.props.balance.last_refund.updated_on &&
      (this.props.balance.last_refund.updated_on + 86400 * 3) * 1000 -
        Date.now() >
        0
        ? this.props.balance.last_refund.quantity +
          " (" +
          this.msToMS(
            (this.props.balance.last_refund.updated_on + 86400 * 3) * 1000 -
              Date.now(),
            99
          ) +
          ")"
        : "";

    const total_dividend = this.props.balance
      ? this.props.limit - this.props.balance.reserve > 0
        ? this.props.limit - this.props.balance.reserve
        : 0
      : 0;
    const dividend_estimate = this.props.balance
      ? this.props.balance.dividendbalance
      : 0;
    const my_stake = this.props.balance ? this.props.balance.stake : 0;
    const total_stake = this.props.balance
      ? this.props.balance.total_stake
      : 100;

    return (
      <React.Fragment>
        <div className="left-fixed-div">
          <ReactNotify ref="notificator" />
        </div>
        <div className="mobilenotifications">
          <ReactNotify ref="mnotificator" />
        </div>
        <div>
          <ReactModal
            className="Dividend"
            closeTimeoutMS={200}
            onRequestClose={this.handleCloseModal}
            shouldCloseOnOverlayClick={true}
            overlayClassName="Overlay"
            isOpen={this.state.showModal}
            contentLabel="Dividends Modal"
          >
            <a
              href="#"
              className="dividend-close"
              onClick={this.handleCloseModal}
            >
              X
            </a>
            <span className="dividend-top float-l">
              <Trans i18nKey="dividendpool.label" />{" "}
              <small>{this.state.date}</small>
            </span>
            {/*<span className="dividend-top float-r">{`${(this.props.balance ? (this.props.limit - this.props.balance.reserve)/4 : 0).toFixed(4)} EOS`}</span>*/}

            <span className="dividend-top float-r">{`${(this.props.balance
              ? (this.props.limit - this.props.balance.reserve) *
                this.props.balance.dividendpoolshare
              : 0
            ).toFixed(4)} EOS`}</span>

            <div className="dividend-chart">
              <PieChart
                data={this.dataMock}
                lineWidth={15}
                startAngle={-90}
                paddingAngle={10}
                rounded
                className="dividend-donut"
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}
                animate
              />
              <div className="center">
                <span className="dividend-next">
                  <Trans i18nKey="nextdividend.label" />
                </span>
                <span className="dividend-timer">
                  {this.state.timeRemaining}
                </span>
              </div>
            </div>
            <span className="dividend-bottom float-l">
              <Trans i18nKey="claimabledividend.label" />
              <br />
              {(dividends != "" ? Number(dividends) : 0).toFixed(4)} EOS
            </span>
            <span className="dividend-bottom float-r">
              {/*<span className="dividend-dot"><img src={require('../../images/eos.png')} width="32" height="32" /></span>*/}
              <Trans i18nKey="projecteddailydividend.label" />
              <br />
              {this.props.balance
                ? (
                    total_dividend *
                    (this.props.balance.stake /
                      this.props.balance.total_stake) *
                    this.props.balance.dividendpoolshare
                  ).toFixed(4)
                : 0}{" "}
              EOS
            </span>
            <button className="dividend-button" onClick={claimLLG}>
              <Trans i18nKey="claim.label" />
            </button>
            <div className="dividend-stats">
              <span className="dividend-bottom float-l">
                <Trans i18nKey="totalcirculation.label" />
              </span>
              <span className="dividend-bottom float-r">{`${(this.props.balance
                ? 250000000 - this.props.balance.circulation
                : 0
              ).toFixed(4)} LLG`}</span>
              <span className="dividend-bottom float-l">
                <Trans i18nKey="totalstakedllg.label" />
              </span>
              <span className="dividend-bottom float-r">{`${(this.props.balance
                ? this.props.balance.total_stake
                : 0
              ).toFixed(4)} LLG`}</span>
              <span className="dividend-bottom float-l">
                <Trans i18nKey="dividendweight.label" />
              </span>
              <span className="dividend-bottom float-r">{`${(this.props.balance
                ? (250000000 - this.props.balance.circulation) /
                  this.props.balance.total_stake
                : 0
              ).toFixed(2)}`}</span>
            </div>
            <div className="spacer creme" />
            <form className="dividend-stats-radio center">
              <div className="radio">
                <input
                  id="stakeCheckbox"
                  type="radio"
                  checked={this.state.stake ? true : false}
                  value="true"
                  onChange={this.toggleStakeUnstake}
                />
                <label for="stakeCheckbox">
                  <Trans i18nKey="stake.label" />
                </label>
              </div>
              <div className="radio">
                <input
                  id="unstakeCheckbox"
                  type="radio"
                  checked={!this.state.stake ? true : false}
                  value="false"
                  onChange={this.toggleStakeUnstake}
                />
                <label for="unstakeCheckbox">
                  <Trans i18nKey="unstake.label" />
                </label>
              </div>
            </form>
            <form className="dividend-stats center" onSubmit={stakeLLG}>
              <div className="dividend-balances">
                <Trans
                  i18nKey={
                    this.state.stake ? "stakeable.label" : "staked.label"
                  }
                />{" "}
                {this.state.stake
                  ? this.props.balance
                    ? Math.abs(
                        this.props.balance.llg -
                          this.props.balance.stake -
                          this.props.balance.refund
                      ).toFixed(4)
                    : 0
                  : this.props.balance
                  ? this.props.balance.stake.toFixed(4)
                  : 0}{" "}
                LLG
                {unstakeCooldown != "" && !this.state.stake && (
                  <p>
                    <Trans i18nKey="unstaking.label" />
                    {" " + unstakeCooldown}
                  </p>
                )}
              </div>
              <div className="dividend-amount">
                <input
                  className="dividend-input"
                  type="text"
                  onChange={this.updateInput}
                  value={this.state.input}
                />
                <button className="dividend-confirm">
                  <Trans i18nKey="confirm.label" />
                </button>
              </div>
            </form>
          </ReactModal>
        </div>
      </React.Fragment>
    );
  }
}

export function openDividend() {
  openDividendFn();
  return { type: "NOTIFICATION" };
}

export default Notifier;
