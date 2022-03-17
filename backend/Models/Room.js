import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var roomSchema = new Schema({
    name: {type: String, required: true},
    description: { type: String, required: false },
    createdAt: { type: Date, default: Date.now }
},
{
    versionKey: false
});

const Rooms = mongoose.model('Room', roomSchema);
export { Rooms };