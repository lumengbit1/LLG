import React,{Component} from 'react'
import { List } from 'immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import { Preload } from 'react-preload';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getIdentity, toggleAudio, stakeLLG, claimLLG,setNode } from '../../sagas/GameState/actions';
import {selectLimit,selectCurrentGame, selectAudio, selectRoadmap,selectResult as selectDraw, selectIdentity, selectAccount, selectScatter, selectStatus, selectStatusTime,selectNode, selectDaily} from '../../sagas/GameState/reducer'
import {
    selectBalance,
    selectLockedBets,
    selectShowResult,
    selectResult,
    setBets,
    setResult,
    hideResult,
    changeBalance, //TODO: remove this later
} from '../../reducers/PlaceBets';

import Header from '../Header';
import BetNotifications, { openSnackbar } from '../BetNotifications';
import Dividends, { openDividend } from '../Dividends';
import Dailyleaderboard,{openDailyleaderboard} from '../dailyLeaderboard';



import bg from '../../images/body-bg.jpg';

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Trans } from 'react-i18next';
import './../../css/style.css'

function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

const styles = theme => ({
    '@global': {
        body: {
            //backgroundColor: theme.palette.grey[900],
            backgroundImage: `url(${bg})`,
            backgroundRepeat: 'repeat',
            backgroundSize: 'cover'
        },
    },
    layout: {
        width: 'auto',
    },
    bettingGrid: {
        marginTop: theme.spacing.unit*2
    },
    root: {
        backgroundColor: theme.palette.background.paper,
    },
});







class Lobby extends Component {
    constructor(props){
        super(props)
        this.state = {
            value: 0,
        };
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };
    render() {
        const { classes, theme, ...otherProps } = this.props;
        return(
            <div>
                <CssBaseline />
                <Header identity={otherProps.identity} getIdentity={otherProps.getIdentity} scatter={otherProps.scatter} toggleAudio={otherProps.toggleAudio} audio={otherProps.audio} modal={otherProps.notification} dividend={otherProps.dividend} dailyleaderboard={otherProps.dailyleaderboard} menu={otherProps.menu} nodeChoose={otherProps.setNode} nodechosen={otherProps.node}/>
                {console.log('Enter Game')}
                <Dividends {...otherProps}/>
                <Dailyleaderboard {...otherProps}/>
                <BetNotifications />
                <body>
                <div className={classes.root}>
                    <AppBar position="static" color="default" >
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            fullWidth


                        >
                            <Tab id="lobbyTab" label={<Trans i18nKey={'lobby.label'}></Trans>} />
                            <Tab id="lobbyTab"  label={<Trans i18nKey={'dividend.label'}></Trans>} />
                            <Tab id="lobbyTab"  label={<Trans i18nKey={'leaders.label'}></Trans>} />
                            <Tab id="lobbyTab"  label={<Trans i18nKey={'help.label'}></Trans>} />
                        </Tabs>
                    </AppBar>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={this.state.value}
                        onChangeIndex={this.handleChangeIndex}
                    >
                        <TabContainer dir={theme.direction}>Item One</TabContainer>
                        <TabContainer dir={theme.direction}>Item Two</TabContainer>
                        <TabContainer dir={theme.direction}>Item Three</TabContainer>
                        <TabContainer dir={theme.direction}>Item Four</TabContainer>
                    </SwipeableViews>
                </div>
                </body>
            </div>
        );
    }
}
Lobby.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
    currentGame: selectCurrentGame(),
    roadmaps:    selectRoadmap(),
    limit:       selectLimit(),
    audio:       selectAudio(),
    balance:     selectAccount(),
    lockedBets:  selectLockedBets(),
    showResult:  selectShowResult(),
    results:     selectResult(),
    draw:        selectDraw(),
    identity:    selectIdentity(),
    scatter:     selectScatter(),
    status:      selectStatus(),
    statusTime:  selectStatusTime(),
    node:        selectNode(),
    dailyData:   selectDaily(),
});

function mapDispatchToProps(dispatch) {
    return {
        setBalance: delta => dispatch(changeBalance(delta)),
        getIdentity: reset => dispatch(getIdentity(reset)),
        toggleAudio: () => dispatch(toggleAudio()),
        setResult: result => dispatch(setResult(result)),
        hideResult: result => dispatch(hideResult(result)),
        clearLockedBets: () => dispatch(setBets(List())),
        dividend: message => dispatch(openDividend()),
        notification: message => dispatch(openSnackbar(message)),
        stakeLLG: (quantity,stake) => dispatch(stakeLLG(quantity,stake)),
        claimLLG: () => dispatch(claimLLG()),
        setNode: node=> dispatch(setNode(node)),
        dailyleaderboard: ()=>dispatch(openDailyleaderboard()),
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withStyles(styles,{ withTheme: true }),
    withConnect
)(Lobby);
