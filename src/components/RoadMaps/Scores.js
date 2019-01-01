import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Trans } from 'react-i18next';

const styles = theme => ({

})

class RoadMaps extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidUpdate(prevProps,prevState) {
  }

  render() {
    const {classes,betType} = this.props;
    return (
        <table cellPadding="0" cellSpacing="0" align="center">
            <tbody>
              <tr>
                <td><Trans i18nKey={betType.toLowerCase() + 'bet.label'}></Trans></td>
                <td className="sm-text"><Trans i18nKey='min.label'></Trans><span>1</span> EOS</td>
                <td className="sm-text"><Trans i18nKey='max.label'></Trans><span>{betType === 'Main' ? 1000 : 100}</span> EOS</td>
              </tr>
            </tbody>
        </table>
    )
  }
}

export default withStyles(styles)(RoadMaps);
