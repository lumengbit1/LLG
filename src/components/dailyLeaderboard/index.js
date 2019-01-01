import React from "react";
import ReactModal from "react-modal";
import "../../css/react-notify.css";
import { Trans } from "react-i18next";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

import Arrow from "@material-ui/icons/ArrowBackIos";
import Arrow2 from "@material-ui/icons/ArrowForwardIos";

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500
  }
});

let opendailyleaderboardFn;
class Dailyleaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      value: 0
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  componentDidMount() {
    opendailyleaderboardFn = this.handleOpenModal;
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { currentGame, leaderboard, theme } = this.props;

    if (!currentGame || !leaderboard) {
      return null;
    }

    return (
      <div>
        <ReactModal
          className="Leaderboard"
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
          <div className="leaderboard-top">
            <Trans i18nKey="leaderboard.label" />
          </div>
          <div>
            <AppBar
              position="static"
              color="default"
              classes={{ root: "appBar" }}
            >
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                fullWidth
              >
                <Tab
                  id="leaderboardTab"
                  label={<Trans i18nKey="leaderboard.today" />}
                />
                <Tab
                  id="leaderboardTab"
                  label={<Trans i18nKey="leaderboard.yesterday" />}
                />
                <Tab
                  id="leaderboardTab"
                  label={<Trans i18nKey="leaderboard.week" />}
                />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={this.state.value}
              onChangeIndex={this.handleChangeIndex}
            >
              {[
                leaderboard.today,
                leaderboard.yesterday,
                leaderboard.weekly
              ].map((d, i) => {
                if (!d) {
                  return null;
                }

                // only show prize for daily leaderboard up to 3rd place, and up to 5th place for weekly
                const prizeCutoff = i === 2 ? 4 : 2;

                return (
                  <TabContainer dir={theme.direction}>
                    <table className="leaderboardtable">
                      <tr>
                        <th>
                          <td>
                            <Trans i18nKey="leaderNo.label" />
                          </td>
                        </th>
                        <th>
                          <td>
                            <Trans i18nKey="leaderAccount.label" />
                          </td>
                        </th>
                        <th>
                          <td>
                            <Trans i18nKey="leaderAmount.label" /> (EOS)
                          </td>
                        </th>
                      </tr>
                      {d.map((item, index) => {
                        return (
                          <tr>
                            <td>
                              <div
                                className={index <= prizeCutoff ? "nopad" : ""}
                              >
                                {index > prizeCutoff ? (
                                  index + 1
                                ) : (
                                  <img
                                    className="leaderboardImage"
                                    src={require(`../../images/leaderboard_${index +
                                      1}.png`)}
                                  />
                                )}
                              </div>
                            </td>
                            <td>
                              <div>{item._id}</div>
                            </td>
                            <td>
                              <div>{item.value}</div>
                            </td>
                          </tr>
                        );
                      })}
                    </table>
                  </TabContainer>
                );
              })}
            </SwipeableViews>
          </div>
        </ReactModal>
      </div>
    );
  }
}
Dailyleaderboard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};
export function openDailyleaderboard() {
  opendailyleaderboardFn();
  return { type: "NOTIFICATION" };
}

export default withStyles(styles, { withTheme: true })(Dailyleaderboard);
