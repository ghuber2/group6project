const mongoose= require('mongoose');
const Schema=mongoose.Schema;

const postInfo = new Schema({
    lat: {
        type: String,
        required: true
    },
    long: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    date:{
        type:String,
        required: true
    },
    username:{
        type: String,
        required: true
    }
})
const PostInfo=mongoose.model('Post',postInfo);

module.exports=PostInfo;