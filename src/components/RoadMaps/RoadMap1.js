import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import RoadMapLeftScores from './RoadMapLeftScores';
import $ from 'jquery';
import { Trans } from 'react-i18next';

const styles = theme => ({

})

const splitString = (tSplit) => {
  let letter = tSplit[0]
  let type = 'c'
  let colour = ''
  let pos = ''

  if(letter === 'B') colour = 'red'
  if(letter === 'P') colour = 'blue'
  if(letter === 'T') colour = 'green'

  if(tSplit[1] === 'BP') pos = 'top'
  if(tSplit[1] === 'PP') pos = 'bottom'
  if(tSplit[1] && tSplit[2]) pos = 'both'


  return {letter, type, pos, colour}
}

class RoadMap1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidUpdate(prevProps,prevState) {
  }

  onRightArrow() {
    $(".roadmap-lh").animate({scrollLeft: $('.roadmap-lh-tbl').innerWidth()}, 800);
    return false;
  }

  render() {
    const {classes,rowData} = this.props;

    const tblrw = (trData,i) => {
      let fullLength = trData.concat(Array(12-trData.length).fill(''));
      return (
      <React.Fragment key={i}>
        <tr >
        {fullLength.map((t,k) => (
          (t !== '') ? (
            (<td key={k}><div className="i-box">
            {((split) => {
              const {letter, type, pos, colour} = splitString(split)
              switch (pos) {
                case 'bottom': return <div className={`w-div ${colour}`}><Trans i18nKey={letter + '.label'}></Trans> <span className={`${type} ${pos}-${type}`}/></div>
                case 'top': return <div className={`w-div ${colour}`}><span className={`${type} ${pos}-${type}`}/><Trans i18nKey={letter + '.label'}></Trans></div>
                case 'both': return <div className={`w-div ${colour}`}><span className={`${type} top-${type}`}/><Trans i18nKey={letter + '.label'}></Trans><span className={`${type} bottom-${type}`}/></div>
                default: return <div className={`w-div ${colour}`}><Trans i18nKey={letter + '.label'}></Trans></div>
              }
            })(t.split('/'))}
            </div></td>))
           :
            (<td key={k}></td>)
        ))
        }
        </tr>
      </React.Fragment>
      )
    };

    return (
    <div className="table-grid-div">
        <div className="scroll-div roadmap-lh">
          <table cellPadding="0" cellSpacing="0" className="roadmap-lh-tbl">
            <tbody>
              <tr>
                <td className="RoadMapLeftScores">
                  <RoadMapLeftScores roadmap={rowData}/>
                </td>
                <td>
                <table cellPadding="0" cellSpacing="0" className="table-grid-div--inner">
                  <tbody>
                    {rowData.map((row,i) => (
                      tblrw(row,i)
                    ))}
                  </tbody>
                </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      {document.body.clientWidth>460 ? (
        <a className="b-right-arrow" onClick={() => {this.onRightArrow()}}>
        <img src={require('../../images/arrow.png')} />
        </a>
        ):''}

    </div>
    )
  }
}

export default withStyles(styles)(RoadMap1);
