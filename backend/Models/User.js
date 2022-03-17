import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const User = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    createdAt: { type: Date, default: Date.now }
},
{
    versionKey: false
});

const Users = mongoose.model('User', User)
export { Users };