import React, { Component } from "react";
import ReactModal from "react-modal";
import { withI18n } from "react-i18next";

export default withI18n()(
  class ActivityModal extends Component {
    state = {
      open: false
    };

    openModal = () => {
      this.setState({
        open: true
      });
    };

    handleCloseModal = () => {
      this.setState({
        open: false
      });
    };
    render() {
      const { t } = this.props;
      return (
        <span>
          <img
            className="sound"
            src={require("../../images/gift.png")}
            // onClick={() => props.toggleAudio()}
            width="15"
            height="15"
            onClick={this.openModal}
          />
          <ReactModal
            className="Activity"
            closeTimeoutMS={200}
            onRequestClose={this.handleCloseModal}
            shouldCloseOnOverlayClick={true}
            overlayClassName="Overlay"
            isOpen={this.state.open}
            contentLabel="Dividends Modal"
          >
            <a
              href="#"
              className="dividend-close"
              onClick={this.handleCloseModal}
            >
              X
            </a>
            <div>
              <p dangerouslySetInnerHTML={{ __html: t("activity.row1") }} />
              <p dangerouslySetInnerHTML={{ __html: t("activity.row2") }} />
              <p dangerouslySetInnerHTML={{ __html: t("activity.row3") }} />
            </div>
          </ReactModal>
        </span>
      );
    }
  }
);
