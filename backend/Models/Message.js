import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var messageSchema = new Schema({
    room: { type: Schema.Types.ObjectId, required: true, ref: 'Room' },
    sender: { type: Schema.Types.ObjectId, required: true, ref: 'User'},
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
},
{
    versionKey: false
});


const Messages = mongoose.model('Message', messageSchema);
export { Messages };