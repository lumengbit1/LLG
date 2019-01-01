
import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Trans } from 'react-i18next';

const styles = theme => ({

})



class RoadMapLeftScores extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidUpdate(prevProps,prevState) {
  }

  render() {
    const {roadmap} = this.props;
    const flattened = [].concat.apply([],roadmap);
    const scores = [
      {symbols: <span className="lg-t">#</span>, score: flattened.length},
      {symbols: <div className="w-div blue"><Trans i18nKey='P.label'></Trans></div>, score: flattened.filter(f=>f[0]==='P').length},
      {symbols: <div className="w-div red"><Trans i18nKey='B.label'></Trans></div>, score: flattened.filter(f=>f[0]==='B').length},
      {symbols: <div className="w-div green"><Trans i18nKey='T.label'></Trans></div>, score: flattened.filter(f=>f[0]==='T').length},
      {symbols: <div className="w-div"><span className="c top-c"></span></div>, score: flattened.filter(f=>f.includes('BP')).length},
      {symbols: <div className="w-div"><span className="c bottom-c"></span></div>, score: flattened.filter(f=>f.includes('PP')).length}]

    return (
      <table cellPadding="0" cellSpacing="0" width="100%">
          <tbody>
            {scores.map((score,i) => (
              <tr key={i}>
              <td className="first-td"><div className="i-box">
                  <table cellPadding="0" cellSpacing="0">
                    <tbody>
                    <tr>
                      <td className="fw">
                        {score.symbols}
                      </td>
                      <td> {score.score}</td>
                    </tr>
                    </tbody>
                  </table>
                </div></td>
            </tr>
            ))}
          </tbody>
        </table>
    )
  }
}

export default withStyles(styles)(RoadMapLeftScores);
