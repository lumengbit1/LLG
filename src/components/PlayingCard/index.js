import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

});

const PlayingCard = props => {
  const {suit, rank} = props;
  const s = suit || 'back-black';
  const r = '' || rank;
  return (
    <img src={`../static/images/cards/${s}_${r}.png`}/>
  )
}

export default withStyles(styles)(PlayingCard)
