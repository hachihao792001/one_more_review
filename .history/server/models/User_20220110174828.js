import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        default: "anonymous user",
    },
    image: {
        type: String,
        required: true,
        default: "https://i.pinimg.com/236x/d5/b9/81/d5b98102441250ce1e86802ff71be61f.jpg"
    },

    age: {
        type: Number,
        min: 10,
        max: 100,
        default: 18
    },
    gender: {
        type: Boolean,
        default: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    country: {
        type: String,
        required: true,
        default: "Viet Nam",

    },
    createdAt: {
        type: Number,
        default: new Date().getTime(),
    },
});

const User = mongoose.model('User', userSchema);
export default User;