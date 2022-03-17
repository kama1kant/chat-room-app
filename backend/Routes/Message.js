import express from 'express';
var router = express.Router();

import { Messages } from '../Models/Message.js';
import { check } from '../utils/check.js';
import { checkAuth } from '../utils/passport.js';


router.get('/get', checkAuth, (req, res) => {
    const params = JSON.parse(req.query.data);
    if (check(['roomId'], params)) {
        Messages.find({ room: params.roomId }, { createdAt: 0 }, (error, messages) => {
            if (error) {
                res.status(500).end('Error Occured');
            }
            if (messages) {
                res.status(200).end(JSON.stringify(messages));
            }
            else {
                res.status(200).end('Invalid Room Id');
            }
        }).populate('room', 'name').populate('sender', 'username');
    }
    else {
        res.status(500).end('Invalid Parameters');
    }
});

router.post('/send', checkAuth, (req, res) => {
    var newMessage = new Messages({
        room: req.body.roomId,
        sender: req.body.senderId,
        message: req.body.message
    });

    newMessage.save((error, data) => {
        if (error) {
            res.status(500).end('Error Occured');
        }
        else {
            res.status(200).end('New Message Added');
        }
    });
});

export { router };