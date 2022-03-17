import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const cookieExpiry = new Date(Date.now() + 2592000);    //30 days
const {REACT_APP_SERVER_URL} = process.env;


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            alert: ''
        }
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitSignIn = this.submitSignIn.bind(this);
    }

    usernameChangeHandler = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    setSignInDetails = (userId, username, token) => {
        this.setState({
            authFlag: true,
            alert: ''
        });

        cookies.set('userId', userId, { path: '/', expires: cookieExpiry });
        cookies.set('username', username, { path: '/', expires: cookieExpiry });
        cookies.set('token', token, { path: '/', expires: cookieExpiry });
        this.props.history.push('/chatroomlist');
    }

    submitSignIn = () => {
        if (this.state.username.length === 0 || this.state.password.length === 0) {
            this.setState({
                alert: 'Invalid Parameters'
            })
            return;
        }

        const data = {
            username: this.state.username,
            password: this.state.password
        }
        Axios.defaults.withCredentials = true;
        Axios.post(`${REACT_APP_SERVER_URL}/users/signin`, data)
            .then(response => {
                this.setSignInDetails(response.data.userId, response.data.username, response.data.token);
            })
            .catch(error => {
                this.setState({
                    alert: error.response.data
                })
            });
    }

    render() {
        return (
            <>
                <div className='container'>
                    <div className='row text-center justify-content-center mt-5 py-5'>
                        <div className='row text-start justify-content-center pt-5'>
                            <div className='col-12'>
                                <div className='mb-3 row'>
                                    <div className='col-4'>
                                    </div>
                                    <div className='col-4'>
                                        <input type='text' className='form-control' id='inputUserName' placeholder='Username' onChange={this.usernameChangeHandler} />
                                    </div>
                                    <div className='col-4'>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12'>
                                <div className='mb-3 row'>
                                    <div className='col-4'>
                                    </div>
                                    <div className='col-4'>
                                        <input type='password' className='form-control' id='inputPassword' placeholder='Password' onChange={this.passwordChangeHandler} />
                                    </div>
                                    <div className='col-4'>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row text-center justify-content-center'>
                            <div className='col-12'>
                                <div className='mb-3 row'>
                                    <div className='col-4'>
                                    </div>
                                    <div className='col-4'>
                                        <button type='button' className='btn btn-dark w-100 fw-bold' onClick={this.submitSignIn}>Sign In</button>
                                    </div>
                                    <div className='col-4'>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12'>
                                <div className='mb-3 row'>
                                    <div className='col-4'>
                                    </div>
                                    <div className='col-4'>
                                        <div className='text-danger'>{this.state.alert}</div>
                                    </div>
                                    <div className='col-4'>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row text-center justify-content-center'>
                        <div className='col-12'>
                            New User?<Link to='/signup' className='text-decoration-none'> Create an account</Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}


export default Login;
