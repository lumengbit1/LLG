import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TotalBets from './TotalBets';
import Timer from './Timer';

const styles = theme => ({
});

const Summary = props => {
  // const { classes } = props;
  return (
      <React.Fragment>
        {/* <div className="right-fixed-div"> */}
          <Timer {...props} />
          <TotalBets {...props}/>
        {/* </div> */}
      </React.Fragment>
  )
}

export default withStyles(styles)(Summary);
