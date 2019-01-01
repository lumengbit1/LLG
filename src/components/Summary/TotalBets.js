
import React from 'react';
import { Trans } from 'react-i18next';
import LinearProgress from '@material-ui/core/LinearProgress';
// Balance :  EOS
    /* Min Bet : 1 EOS */
    /* Max Bet : 100 EOS */
// const styles = {
//     root: {
//         flexGrow: 1,
//     },
// };

const TotalBets = props => {
  const {classes,betType,title,ratio,width,...betting} = props;

  const maxMainBets = betting.limit * 0.025; //defaults to 20,000 EOS * 2.5%
  let allBets = 0;
  if(betting.currentGame) {
    allBets = Math.abs(betting.currentGame.playerBets - betting.currentGame.bankerBets);
  }

  let scaleAmount = Number((allBets / maxMainBets)*100).toFixed(0);
  if(scaleAmount>100){
    scaleAmount = 100;
  }
// if(document.body. clientWidth<=460){
//     return(
//         <div className="range-process">
//             <LinearProgress variant="determinate" value={scaleAmount} />
//             <span className={document.body. clientWidth<=460 ? "value-div-res":"value-div"}><span>{scaleAmount}%</span></span>
//         </div>
//     )
// }


// if(document.body. clientWidth<=460){
//   return <div></div>
// }else{
    return (
        <table className="range-slider">
            <tbody>
            <tr>
                <th className="red"><Trans i18nKey="total.label"></Trans></th>
            </tr>
            <tr>
                <td>
                    <div className="percentage-range">
                        <div className="inner-div" style={{height: `${scaleAmount}%`}}>
                            {/*<span className={document.body. clientWidth<=460 ? "value-div-res":"value-div"}><span>{scaleAmount}%</span></span>*/}
                            <span className="value-div"><span>{scaleAmount}%</span></span>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <th className="green"><Trans i18nKey="limit.label"></Trans></th>
            </tr>
            </tbody>
        </table>
    )
// }


}

export default TotalBets;
