import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ChatRoomList from './ChatRoomList';
import ChatRoom from './ChatRoom';
import PrivateRoute from './PrivateRoute';
import PrivateRouteAuth from './PrivateRouteAuth'
import Navbar from './Navbar';

class Main extends Component {
    render() {
        return (
            <>
                <Navbar />
                <Route exact path='/' component={Home} />
                <PrivateRouteAuth path='/signin' component={SignIn} />
                <Route path='/signup' component={SignUp} />
                <PrivateRoute path='/chatroomlist' component={ChatRoomList} />
                <PrivateRoute path='/chatroom' component={ChatRoom} />
            </>
        )
    }
}

export default Main;