import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  withRouter
} from "react-router-dom";
import {
  getCurrentGame,
  getBalance,
  getLeaderboard,
  setScatter,
  getIdentity
} from "../sagas/GameState/actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import ScatterJS from "scatterjs-core";
import Game from "../components/Game";
import Lobby from "../components/Lobby";

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: false,
      file: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    //start game polling
    this.interval = setInterval(() => this.props.getCurrentGame(), 1000);
    this.interval2 = setInterval(() => this.props.getBalance(), 5000);
    setTimeout(() => this.props.getLeaderboard(), 3000);
    this.interval3 = setInterval(() => this.props.getLeaderboard(), 20000);
    //get scatter client
    ScatterJS.scatter.connect("Lelego Baccarat").then(connected => {
      if (!connected) return false;
      window.scatter = null;
      this.props.setScatter(ScatterJS.scatter);
      this.props.getIdentity();
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.interval2);
    clearInterval(this.interval3);
  }

  handleClick() {
    this.setState({
      audio: !this.state.audio,
      profileCollapsed: !this.state.profileCollapsed
    });
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Switch>
              {/*<Route exact path="/" component={Lobby} />*/}
              {/*<Route exact path="/table" component={Game} />*/}
              <Route exact path="/" component={Game} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    getCurrentGame: () => dispatch(getCurrentGame()),
    getBalance: () => dispatch(getBalance()),
    getLeaderboard: () => dispatch(getLeaderboard()),
    setScatter: scatter => dispatch(setScatter(scatter)),
    getIdentity: () => dispatch(getIdentity())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes);
// export default withRouter(connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Routes));
