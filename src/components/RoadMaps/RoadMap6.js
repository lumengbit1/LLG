import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import RoadMapLeftColumn from './RoadMapLeftColumn';

const styles = theme => ({
    imgNumSpan: {
      display: 'block',
      lineHeight: 1,
      fontSize: '1rem',
      fontWeight: 700,
    }
})

const splitName = (imgStr) => {
  //let tSplit = imgStr.split('*')
  let color = imgStr ? imgStr[0] : '';
  let ties = imgStr ? imgStr[1] : null;
  let imgName = color ? `C-${color === 'P' ? 'B' : 'R'}${ties ? 'G' : ''}-O` : '';//
  let imgNum = ties || '';
  return {imgName, imgNum}
}

const compressMaps = (roadmap,size=60) => {

  const fullLength = roadmap ? roadmap.map(rd => rd.concat(Array(size-rd.length).fill(null))) : Array(6).fill(Array(size).fill(null));
  let rows = [];

  for(let i = 0; i < 3; i++) {
    let cells = [];
    for(let j = 0; j < size/2; j++) {
      let mini = [fullLength[i*2][j*2],fullLength[i*2][j*2+1],fullLength[i*2+1][j*2],fullLength[i*2+1][j*2+1]];
      cells.push(mini);
    }
    rows.push(cells);
  }
  return rows
}

class RoadMap6 extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps,prevState) {
  }

  render() {
    const {classes,rowData} = this.props;
    if(rowData.BigEye.length === 6) compressMaps(rowData.BigEye);

    const blank = (<img src={require(`../../images/blank.png`)} width="6" />)

    const tblrw1 = (trData,i) => {
      let fullWidth = trData.concat(Array(60-trData.length).fill(''));
      return (
        <tr key={i}>
        {fullWidth.map((t,k) => (
          <td key={k} width="13" align="center">
            {splitName(t).imgName !== '' ? (<div style={{padding: 2, width: 13, height: 13, margin: '0 auto', backgroundSize: '100%', backgroundImage: `url(${require(`../../images/${splitName(t).imgName}.png`)})`}} >
            {splitName(t).imgNum !== '' ? (<span className={classes.imgNumSpan} >{splitName(t).imgNum}</span>) : (<span></span>)}
            </div>
            ) : (<div>
              </div>)}
          </td>
        ))
        }
        </tr>
      )
    };

    const tblrw2 = (trData) => {
      return (
      <React.Fragment>
        {trData.map((t,i) => (
          (t !== '') ?
            (<td key={i} className="roadmap3">
                <div className={(t.length < 4) ? 'four-img-box text-left' : 'four-img-box text-right'}>
                  <p>
                    {(t[0]) ? (<img src={require(`../../images/C-${t[0]}-B.png`)} width="6" />) : (blank)}
                    {(t[1]) ? (<img src={require(`../../images/C-${t[1]}-B.png`)} width="6"  />) : (blank)}
                  </p>
                  <p>
                    {(t[2]) ? (<img src={require(`../../images/C-${t[2]}-B.png`)} width="6"  />) : (blank)}
                    {(t[3]) ? (<img src={require(`../../images/C-${t[3]}-B.png`)} width="6"  />) : (blank)}
                  </p>
                </div>
              </td>)
           :
            (<td key={i}></td>)
        ))
        }
      </React.Fragment>
      )
    };

    const tblrw3 = (trData) => {
      return (
      <React.Fragment>
        {trData.map((t,i) => (
          (t !== '') ?
            (<td key={i} className="roadmap3">
                <div className={(t.length < 4) ? 'four-img-box text-left' : 'four-img-box text-right'}>
                  <p>
                    {(t[0]) ? (<img src={require(`../../images/C-${t[0]}.png`)} width="6" />) : (blank)}
                    {(t[1]) ? (<img src={require(`../../images/C-${t[1]}.png`)} width="6" />) : (blank)}
                  </p>
                  <p>
                    {(t[2]) ? (<img src={require(`../../images/C-${t[2]}.png`)} width="6" />) : (blank)}
                    {(t[3]) ? (<img src={require(`../../images/C-${t[3]}.png`)} width="6" />) : (blank)}
                  </p>
                </div>
              </td>)
           :
            (<td key={i}></td>)
        ))
        }
      </React.Fragment>
      )
    };

    const tblrw4 = (trData) => {
      return (
      <React.Fragment>
        {trData.map((t,i) => (
          (t !== '') ?
            (<td key={i} className={(i === 0) ? 'lb-line' : ''}>
                <div className={(t.length < 4) ? 'four-img-box text-left' : 'four-img-box text-right'}>
                  <p>
                    {(t[0]) ? (<img src={require(`../../images/sm-${t[0] === 'R' ? 'red' : 'blue'}-line.png`)} width="6" />) : (blank)}
                    {(t[1]) ? (<img src={require(`../../images/sm-${t[1] === 'R' ? 'red' : 'blue'}-line.png`)} width="6" />) : (blank)}
                  </p>
                  <p>
                    {(t[2]) ? (<img src={require(`../../images/sm-${t[2] === 'R' ? 'red' : 'blue'}-line.png`)} width="6" />) : (blank)}
                    {(t[3]) ? (<img src={require(`../../images/sm-${t[3] === 'R' ? 'red' : 'blue'}-line.png`)} width="6" />) : (blank)}
                  </p>
                </div>
              </td>)
           :
            (<td key={i}></td>)
        ))
        }
      </React.Fragment>
      )
    };
      if(document.body.clientWidth>460){
          return (
              <table cellPadding="0" cellSpacing="0" className="main-tbl">
                  <tbody>
                  <tr>
                      <td className="firdt-td" valign="top">
                          <RoadMapLeftColumn predictor={rowData.Predictor} />
                      </td>
                      <td>

                          <table cellPadding="0" cellSpacing="0" width="100%" className="right-tbl">
                              <tbody>
                              {rowData.BigRoad.map((d,i) => (
                                  tblrw1(d,i)
                              ))}


                              {compressMaps(rowData.BigEye,120).map((d,i) => (
                                  <tr key={i} className={i === 0 ? "top-extra-border" : ''}>
                                      {tblrw2(d)}
                                  </tr>
                              ))}

                              {compressMaps(rowData.SmallRoad).map((d,i) => (
                                  <tr key={i} className={i === 0 ? "top-extra-border" : ''}>
                                      {tblrw3(d)}
                                      {tblrw4(compressMaps(rowData.Cockroach)[i])}
                                  </tr>
                              ))}


                              </tbody>
                          </table>
                      </td>
                  </tr>
                  </tbody>
              </table>
          )}else{
          return (
              <table cellPadding="0" cellSpacing="0" className="main-tbl">
                  <tbody>
                  <tr>
                      <td className="firdt-td" valign="top">
                          <RoadMapLeftColumn predictor={rowData.Predictor} />
                      </td>
                      <td>

                          <table cellPadding="0" cellSpacing="0" width="100%" className="right-tbl">
                              <tbody>
                              {rowData.BigRoad.map((d,i) => (
                                  tblrw1(d,i)
                              ))}


                              {compressMaps(rowData.BigEye,120).map((d,i) => (
                                  <tr key={i} className={i === 0 ? "top-extra-border" : ''}>
                                      {tblrw2(d)}
                                  </tr>
                              ))}
                              {document.body.clientWidth<=460 ?
                                  compressMaps(rowData.SmallRoad,120).map((d,i) => (
                                      <tr key={i} className={i === 0 ? "top-extra-border" : ''}>
                                          {tblrw3(d)}
                                      </tr>
                                  )) :
                                  compressMaps(rowData.SmallRoad).map((d,i) => (
                                      <tr key={i} className={i === 0 ? "top-extra-border" : ''}>
                                          {tblrw3(d)}
                                      </tr>
                                  ))}
                              {document.body.clientWidth<=460 ?
                                  compressMaps(rowData.SmallRoad,120).map((d,i) => (
                                      <tr key={i} className={i === 0 ? "top-extra-border" : ''}>
                                          {tblrw4(compressMaps(rowData.Cockroach,120)[i])}
                                      </tr>
                                  )):
                                  compressMaps(rowData.SmallRoad).map((d,i) => (
                                      <tr key={i} className={i === 0 ? "top-extra-border" : ''}>
                                          {tblrw4(compressMaps(rowData.Cockroach)[i])}
                                      </tr>
                                  ))}
                              {/*{compressMaps(rowData.SmallRoad).map((d,i) => (*/}
                                  {/*<tr key={i} className={i === 0 ? "top-extra-border" : ''}>*/}
                                      {/*{tblrw3(d)}*/}
                                  {/*</tr>*/}
                              {/*))}*/}
                              {/*{compressMaps(rowData.SmallRoad).map((d,i) => (*/}
                                  {/*<tr key={i} className={i === 0 ? "top-extra-border" : ''}>*/}
                                      {/*{tblrw4(compressMaps(rowData.Cockroach)[i])}*/}
                                  {/*</tr>*/}
                              {/*))}*/}

                              </tbody>
                          </table>
                      </td>
                  </tr>
                  </tbody>
              </table>)
          }


  }
}

export default withStyles(styles)(RoadMap6);
