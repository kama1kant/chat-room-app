import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Axios from 'axios';
import validator from 'validator';

const { REACT_APP_SERVER_URL } = process.env;


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
        this.submitSignUp = this.submitSignUp.bind(this);
    }

    usernameChangeHandler = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    submitSignUp = (e) => {
        if (this.state.username.length === 0 || this.state.password.length === 0 ){
            this.setState({
                alert: 'Invalid Parammeters'
            })
            return;
        }
        else if (!validator.isStrongPassword(this.state.password)) {
            this.setState({
                alert: 'Password is not Strong'
            })
            return;
        }
        const data = {
            username: this.state.username,
            password: this.state.password
        }
        Axios.defaults.withCredentials = true;
        Axios.post(`${REACT_APP_SERVER_URL}/users/signup`, data)
            .then(response => {
                this.setState({
                    authFlag: true,
                    alert: ''
                });
                this.props.history.push('/signin');
            })
            .catch(error => {
                this.setState({
                    alert: error.response.data
                })
            });
    }

    render() {
        return (<>
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
                                    <button type='button' className='btn btn-dark w-100 fw-bold' onClick={this.submitSignUp}>Create account</button>
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
                        Already a User?<Link to='/signin' className='text-decoration-none'> Sign In</Link>
                    </div>
                </div>
            </div>
        </>
        );
    }
}


export default Login;
