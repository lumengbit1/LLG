import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Trans } from 'react-i18next';

const styles = theme => ({
  cardHeader: {
    backgroundColor: theme.palette.grey[900],
  },
  cardContent: {
    //backgroundImage: `url(${bg})`
    height:200,
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing.unit * 2,
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
})

const suits = ["clubs", "diamonds", "hearts", "spades"];
const ranks = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];

const cardNameGenerated = (card) => {
  if ((card.length > 0)) {
    const {text,suite} = card[0]
    let suffix = (["A","J","Q","K"].indexOf(text)!==-1) ? "png" : "svg";
    let cardName = `${suite}${text}.${suffix}`
    return cardName
  } else {
    return false
  }
}

const TableSide = props => {
  const {classes,title,score,hand,win,bets} = props;
  let firstCard = hand.slice(0, 1);
  let secondCard = hand.slice(1, 2);
  let thirdCard = hand.length > 2 ? hand.slice(2, 3) : [];
  // Now going to map the cards to the card images so they appear in place.
  const defHandStyle = {
    width: '100%',
    height: '100%',
    padding: '5',
    margin: '6',
    marginTop: '30'
  };
  const defHandStyleRot = {
    width: '100%',
    height: '100%',
    padding: '5',
    margin: '3',
    marginTop: '5'
  };
  return (
    <div className={(title === 'Player') ? "col-xs-6 l-col-main" : "col-xs-6 r-col-main"}>
    <div className="head-block-div">
      <h3>
        <em className="hidden-xs has-text-upper"><Trans i18nKey={title.toLowerCase() + '.label'}></Trans></em>
        {/*<span>&nbsp;&nbsp;<Trans i18nKey="score.label"></Trans>&nbsp;{score}</span>*/}
        {document.body.clientWidth<=460 ? <span ><span className="score">{score}</span></span> : <span >&nbsp;&nbsp;<span className="score">{score}</span></span>}
        {/*<span >&nbsp;&nbsp;<span className="score">{score}</span></span>*/}
        <em className="visible-xs">{title}</em>
      </h3>

      <div className="table-card-div">
        <table cellPadding="0" cellSpacing="0" width="100%">
          <tbody>
            <tr>
              <td width="26%" valign="bottom" align={(title === 'Player') ? "right" : ""}>
                <div className={(title === 'Player') ? "card-div v-box h-box" : "card-div v-box"}>
                  <span>
                    {title === 'Player' ? (
                      hand.length > 2 && cardNameGenerated(thirdCard) ? (
                        <img src={require(`../../images/${cardNameGenerated(thirdCard)}`)} />
                      ) : (
                        ''
                      )) :
                      (cardNameGenerated(firstCard) &&
                        <img src={require(`../../images/${cardNameGenerated(firstCard)}`)} />
                      )
                  }
                  </span>
                </div>
              </td>
              <td width={(title === 'Player') ? "10%" : "5%"}>&nbsp;</td>
              <td width="26%">
                <div className="card-div v-box">
                  <span>
                  {title === 'Player' && cardNameGenerated(firstCard) ? (
                      <img src={require(`../../images/${cardNameGenerated(firstCard)}`)} />
                  ) : (cardNameGenerated(secondCard) && <img src={require(`../../images/${cardNameGenerated(secondCard)}`)} />)
                  }
                  </span>
                </div>
              </td>
              <td width={(title === 'Player') ? "5%" : "10%"}>&nbsp;</td>
              <td width="26%" valign="bottom" align={(title === 'Player') ? "" : "left"}>
                <div className={(title === 'Player') ? "card-div v-box" : "card-div v-box h-box"}>
                  <span>
                  {title === 'Banker' ? (
                      hand.length > 2 && cardNameGenerated(thirdCard) ? (
                        <img src={require(`../../images/${cardNameGenerated(thirdCard)}`)} />
                      ) : (
                        ''
                      )) :
                      (cardNameGenerated(secondCard) &&
                        <img src={require(`../../images/${cardNameGenerated(secondCard)}`)} />
                      )
                  }
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}

export default withStyles(styles)(TableSide);
