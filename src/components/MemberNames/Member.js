
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

});

const Member = props => {
  const {membername,score,type,active} = props.member;
  return (
    <li className={(active) ? "active" : ""}> 
      <span>{membername} {score}  {type}</span>
    </li>
  )
}

export default withStyles(styles)(Member)
