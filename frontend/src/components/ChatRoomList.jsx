import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faPlus } from '@fortawesome/free-solid-svg-icons';

import Rooms from './Rooms';
const cookies = new Cookies();
const { REACT_APP_SERVER_URL } = process.env;


class ChatRoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            username: ''
        }
    }

    componentDidMount() {
        Axios.defaults.headers.common['authorization'] = cookies.get('token');
        Axios.get(`${REACT_APP_SERVER_URL}/rooms/getall`)
            .then(response => {
                this.setState({
                    rooms: response.data
                });
            })
            .catch(error => {
                this.setState({
                    message: error.response.data
                })
            });
        if (cookies.get('userName') !== null) {
            this.setState({
                username: cookies.get('username')
            });
        }
    }

    createRoomHandler = () => {
        //TODO create Room feature
    }

    render() {
        return (
            <>
                <div className='container'>
                    <div className='row py-5 text-start justify-content-start'>
                        <div className='row text-start justify-content-start'>
                            <div className='col-6'>
                                <h1>ChatRooms <FontAwesomeIcon icon={faComments} /></h1>
                            </div>
                            <div className='col-6'>
                                <button type='button' className='btn btn-dark float-end' onClick={this.createRoomHandler}><FontAwesomeIcon icon={faPlus} /> Create a new Room</button>
                            </div>
                        </div>
                        <Rooms rooms={this.state.rooms} />
                    </div>
                </div>
            </>
        );
    }
}


export default ChatRoomList;
