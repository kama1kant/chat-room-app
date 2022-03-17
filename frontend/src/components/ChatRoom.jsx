import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'universal-cookie';
import queryString from 'query-string';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import '../Chat.css';
const cookies = new Cookies();
const { REACT_APP_SERVER_URL } = process.env;
let roomId = '';

class ChatRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            messages: [],
            roomName: ''
        }

        const urlParams = queryString.parse(this.props.location.search);
        if ('roomId' in urlParams) {
            roomId = urlParams.roomId;
        }
        this.messageChangeHandler = this.messageChangeHandler.bind(this);
        this.sendMessageHandler = this.sendMessageHandler.bind(this);
    }

    componentDidMount() {
        this.getMessageHistory();
        this.getRoomDetails();
    }

    getRoomDetails = () => {
        const data = {
            'roomId': roomId
        }

        Axios.defaults.headers.common['authorization'] = cookies.get('token');
        Axios.get(`${REACT_APP_SERVER_URL}/rooms/get`, { params: { data } })
            .then(response => {
                this.setState({
                    roomName: response.data.name
                });
            })
            .catch(error => {
                console.log('Error!');
            });
    }

    getMessageHistory = () => {
        const data = {
            'roomId': roomId
        }

        Axios.defaults.headers.common['authorization'] = cookies.get('token');
        Axios.get(`${REACT_APP_SERVER_URL}/messages/get`, { params: { data } })
            .then(response => {
                this.setState({
                    messages: response.data,
                });
            })
            .catch(error => {
                console.log('Error!');
            });
    }

    messageChangeHandler = (e) => {
        this.setState({
            message: e.target.value
        });
    }

    sendMessageHandler = () => {
        if (cookies.get('userId') !== null && roomId.length > 0 && this.state.message.length > 0) {
            const data = {
                senderId: cookies.get('userId'),
                roomId: roomId,
                message: this.state.message
            }

            Axios.defaults.headers.common['authorization'] = cookies.get('token');
            Axios.defaults.withCredentials = true;
            Axios.post(`${REACT_APP_SERVER_URL}/messages/send`, data)
                .then(response => {
                    this.setState({
                        message: ''
                    });
                    this.getMessageHistory();
                })
                .catch(error => {
                    this.setState({
                        message: error.response.data
                    })
                });
        }
    }

    render() {
        let details = <p>No messages</p>;
        if (this.state.messages.length > 0) {
            details = this.state.messages.map(message => {
                return (
                    <div key={message._id}>
                        <p className='fs-7 p-0 m-0'>{message.sender.username}:</p>
                        <p className='fs-5 p-0 mt-0'>{message.message}</p>
                    </div>
                )
            });
        }

        return (
            <div>
                <div className='container'>
                    <div className='row py-5 text-start justify-content-start'>
                        <div className='row text-start justify-content-start'>
                            <div className='col-12'>
                                <h1>{this.state.roomName}</h1>
                            </div>
                        </div>
                        <div className='row text-start justify-content-start'>
                            <div className='col-12 border w-100 d-inline-block p-3 overflow-auto' style={{ height: '520px' }}>
                                <div className=''>
                                    {details}
                                </div>

                            </div>
                        </div>
                        <div className='row text-start justify-content-start pt-2'>
                            <div className='col-12 p-0'>
                                <div className='input-group'>
                                    <input type='text' className='form-control' aria-label='Sizing example input' aria-describedby='inputGroup-sizing-lg' value={this.state.message} placeholder="Type your message here" onChange={this.messageChangeHandler} />
                                    <button type='button' className='btn btn-success' onClick={this.sendMessageHandler}><FontAwesomeIcon icon={faPaperPlane} /> Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default ChatRoom;
