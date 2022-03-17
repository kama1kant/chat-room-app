import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
var router = express.Router();

const saltRounds = 10;
import { Users } from '../Models/User.js';
import { check } from '../utils/check.js';


router.post('/signup', async (req, res) => {
    if (check(['password', 'username'], req.body)) {
        const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
        var newUser = new Users({
            username: req.body.username,
            password: hashPassword,
        });

        Users.findOne({ username: req.body.username }, (error, user) => {
            if (error) {
                res.status(500).end('Error Occured');
            }
            if (user) {
                res.status(400).end('Username already exists');
            }
            else {
                newUser.save((error, data) => {
                    if (error) {
                        res.status(500).end('Error Occured');
                    }
                    else {
                        res.status(200).end('User account created');
                    }
                });
            }
        });
    }
    else {
        res.status(500).end('Invalid Parameters');
    }

});

router.post('/signin', (req, res) => {
    if (check(['password', 'username'], req.body)) {
        Users.findOne({ username: req.body.username }, async (error, user) => {
            if (error) {
                res.status(500).end('Error Occured');
            }
            if (user) {
                const match = await bcrypt.compare(req.body.password, user.password);
                if (match) {
                    const payload = { userId: user._id, username: user.username };
                    const token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1008000
                    });

                    res.status(200).end(JSON.stringify({ userId: user._id, username: user.username, token: `JWT ${token}` }));
                }
                else {
                    res.status(401).end('Wrong Password');
                }
            }
            else {
                res.status(401).end('Invalid Credentials');
            }
        });
    }
    else {
        res.status(500).end('Invalid Parameters');
    }
});

export { router };