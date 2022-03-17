import express from 'express';
var router = express.Router();

import { Rooms } from '../Models/Room.js';
import { check } from '../utils/check.js';
import { checkAuth } from '../utils/passport.js';


router.post('/create', (req, res) => {
    if (check(['name', 'description'], req.body)) {
        var newRoom = new Rooms({
            name: req.body.name,
            description: req.body.description
        });

        Rooms.findOne({ name: req.body.name }, (error, room) => {
            if (error) {
                res.status(500).end('Error Occured');
            }
            if (room) {
                res.end('Room name already exists');
            }
            else {
                newRoom.save((error, data) => {
                    if (error) {
                        res.status(500).end('Error Occured');
                    }
                    else {
                        res.status(200).end('New Room created');
                    }
                });
            }
        });
    }
    else {
        res.status(500).end('Invalid Parameters');
    }
});

router.get('/getall', checkAuth, (req, res) => {
    Rooms.find({}, { createdAt: 0 }, (error, rooms) => {
        if (error) {
            res.status(500).end('Error Occured');
        }
        if (rooms) {
            res.status(200).end(JSON.stringify(rooms));
        }
        else {
            res.status(401).end('Invalid Credentials');
        }
    });
});

router.get('/get', checkAuth, (req, res) => {
    const params = JSON.parse(req.query.data);
    Rooms.findById(params.roomId, { createdAt: 0 }, (error, rooms) => {
        if (error) {
            res.status(500).end('Error Occured');
        }
        if (rooms) {
            res.status(200).end(JSON.stringify(rooms));
        }
        else {
            res.status(401).end('Invalid Credentials');
        }
    });
});

export { router };