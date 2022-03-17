import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { isSignIn } from '../utils/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
const cookies = new Cookies();


const Navbar = (props) => {
    const [signIn, setIsSignin] = useState(isSignIn());
    const navigate = useHistory();

    function signOutHandler() {
        setIsSignin(false);
        cookies.remove('userId');
        navigate.push('/signin');
    }

    function homeButtonHandler() {
        navigate.push('/chatroomlist');
    }

    return (
        <nav className='navbar navbar-light bg-light'>
            <div className='container-fluid'>
                <button type='button' className='btn btn-link navbar-brand text-uppercase fw-bold' onClick={homeButtonHandler}>Chat Room App</button>
                <form className='d-flex'>
                    {
                        signIn && <>
                            <div className='nav-link text-dark'>{cookies.get('username')}</div>
                            <button type='button' className='btn btn-link nav-link text-dark' onClick={signOutHandler} data-bs-toggle="tooltip" > <FontAwesomeIcon icon={faArrowRightFromBracket} data-bs-placement="bottom" title="Sign Out"/></button>
                        </>
                    }
                </form>
            </div>
        </nav>
    );
}

export default Navbar;
