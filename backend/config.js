import express from 'express';
const app = express();
import session from 'express-session';
import mongoose from 'mongoose';
import 'dotenv/config';


const config = {
    mongoDB: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.n7afn.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
};

const expressSettings = () => {
    app.use(session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        duration: 60 * 60 * 1000,
        activeDuration: 5 * 60 * 1000
    }));

    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
        res.setHeader('Cache-Control', 'no-cache');
        next();
    });
}

const mongoSettings = () => {
    var options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    mongoose.connect(config.mongoDB, options, (err, res) => {
        if (err) {
            console.log(err);
            console.log(`MongoDB Connection Failed`);
        } else {
            console.log(`MongoDB Connected`);
        }
    });
}

const configurations = () => {
    expressSettings();
    mongoSettings();
}

export { config, configurations };