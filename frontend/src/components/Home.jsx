import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

const Home = (props) => {
    function enterHandler(){
        props.history.push('/chatroomlist');
    }

    return (
        <div>
            <div className='container'>
                <div className='row py-5 text-center justify-content-start'>
                    <div className='col-12'>
                        <h1><FontAwesomeIcon icon={faComments} /></h1>
                        <h1>Welcome to Chat Room App </h1>
                    </div>
                    <div className='col-12'>
                        <div className='mb-3 row'>
                            <div className='col-4'>
                            </div>
                            <div className='col-4'>
                                <Link to='/signin' className='text-center text-decoration-none fs-1'>
                                    <button type='button' className='btn btn-dark w-100 fw-bold' onClick={enterHandler}>Enter</button>
                                </Link>
                            </div>
                            <div className='col-4'>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Home;
