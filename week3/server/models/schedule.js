const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    plantName:{
        type:String,
        required:true
    },
    watering:{
        type:Number,
    },
    pruning:{
        type:Number,
    },
    fertilizing:{
        type:Number,
    },
    scheduledBy:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('Schedule', scheduleSchema);