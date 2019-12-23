const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
mongoose.connect('mongodb://127.0.0.1:27017/Hotels');
const db = mongoose.connection;

db.on('error', (err) => {
    throw new Error(err);
});
db.once('open', () => {
    console.log("Connected to DB!");
});

const hotelSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    stars: { type: Number },
    img: { type: String }
});

const roomSchema = new Schema({
    room: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    accessibility: { type: Boolean, required: true },
    hotelId: { type: ObjectId, required: true },
    description: { type: String, required: true }
});

const userSchema = new Schema({
    username: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    secondName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    balance: { type: Number, required: true }
});

const Hotels = mongoose.model('hotels', hotelSchema);
const Rooms = mongoose.model('rooms', roomSchema);
const Users = mongoose.model('hotelUsers', userSchema);

exports.Hotels = Hotels;
exports.Rooms = Rooms;
exports.Users = Users;