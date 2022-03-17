import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import 'dotenv/config';
import { Users } from '../Models/User.js';

function auth() {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: process.env.SECRET_KEY
    };
    passport.use(
        new JwtStrategy(opts, (jwtPayload, callback) => {
            const _id = jwtPayload.userId;
            Users.findById(_id, (err, results) => {
                if (err) {
                    return callback(err, false);
                }
                if (results) {
                    callback(null, results);
                }
                else {
                    callback(null, false);
                }
            });
        })
    )
}

// exports.auth = auth;
// exports.checkAuth = passport.authenticate("jwt", { session: false });
const checkAuth = passport.authenticate("jwt", { session: false });
export { auth, checkAuth };


