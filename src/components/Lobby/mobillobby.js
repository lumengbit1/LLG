import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch,NavLink,Redirect } from 'react-router-dom';
import ReactSwipe from 'react-swipe';



const MobilLobby= props => {
    let data = {id:3,name:'sam',age:36};
    let path = {
        pathname:'/table',
        state:data,
    }
    let reactSwipeEl;
console.log('MobilLobby')
        return (
            <div >
                <NavLink exact to={path}>Test</NavLink>
                <ReactSwipe
                    className="carousel"
                    swipeOptions={{ continuous: true }}
                    ref={el => (reactSwipeEl = el)}
                >
                    <div>PANE 1</div>
                    <div>PANE 2</div>
                    <div>PANE 3</div>
                </ReactSwipe>
                <button onClick={() => reactSwipeEl.prev()}>Previous</button>
                <button onClick={() => reactSwipeEl.next()}>Next</button>
            </div>
        )
}
export default MobilLobby;