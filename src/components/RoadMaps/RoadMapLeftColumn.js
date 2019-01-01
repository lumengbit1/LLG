
import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Trans } from 'react-i18next';

const styles = theme => ({

})

class RoadMapLeftColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidUpdate(prevProps,prevState) {
  }

  render() {
    const {predictor} = this.props;
    return (
        <table cellPadding="0" cellSpacing="0" width="100%">
      <tbody>
      <tr>
          <td colSpan="2">
              <div className="roundtext"><Trans i18nKey='roundtext.label'></Trans></div>
          </td>
      </tr>
        <tr>

          <td><div className="w-div blue large"><Trans i18nKey='P.label'></Trans></div></td>
          <td><div className="w-div red large"><Trans i18nKey='B.label'></Trans></div></td>
        </tr>
        <tr>
          <td><div className={predictor.P[0] == "R" ? "w-div red bigeye large" : predictor.P[0] == "B" ? "w-div blue bigeye large" : "w-div invis large"} width="27"></div></td>
          <td><div className={predictor.B[0] == "R" ? "w-div red bigeye large" : predictor.B[0] == "B" ? "w-div blue bigeye large" : "w-div invis large"} width="27"></div></td>
        </tr>
        <tr>
          <td><div className={predictor.P[1] == "R" ? "w-div red large" : predictor.P[1] == "B" ? "w-div blue large" : "w-div invis large"}></div></td>
          <td><div className={predictor.B[1] == "R" ? "w-div red large" : predictor.B[1] == "B" ? "w-div blue large" : "w-div invis large"}></div></td>
        </tr>
        <tr>
          <td><img src={predictor.P[2]== "R" ? require('../../images/red-line.png') : predictor.P[2]== "B" ? require('../../images/blue-line.png') : require('../../images/blank.png')} width="27"/></td>
          <td><img src={predictor.B[2]== "R" ? require('../../images/red-line.png') : predictor.B[2]== "B" ? require('../../images/blue-line.png') : require('../../images/blank.png')} width="27"/></td>
        </tr>
        </tbody>
      </table>
    )
  }
}

export default withStyles(styles)(RoadMapLeftColumn);
