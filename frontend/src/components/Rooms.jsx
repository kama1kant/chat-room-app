import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'universal-cookie';


const Rooms = (props) => {
    let details = props.rooms.map(room => {
        return (
            <a href={`chatroom?roomId=${room._id}`} key={room._id} className='list-group-item list-group-item-action flex-column align-items-start'>
                <h5 className='mb-1'>{room.name}</h5>
                <p className='mb-1'>{`${room.description}`}</p>
            </a>
        )
    });
    
    return (
        <>
            <div className='row pt-5 text-start justify-content-start'>
                <div className='col-12'>
                    <div className='list-group'>
                        {details}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Rooms;