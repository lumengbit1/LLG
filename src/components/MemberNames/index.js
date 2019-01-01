import React from 'react';
import Member from './Member';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

});

const MemberNames = props => {
  const {classes,members} = props;
  return (
    <div className="left-fixed-div">
      <ul>
        {members.map((member,index) => (
          <Member key={index} member={member} />
        ))}
      </ul>
    </div>
  )
}

export default withStyles(styles)(MemberNames)
