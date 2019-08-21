const mongoose = require('mongoose')

const taskSchema =  new mongoose.Schema({
    description:{
        type: String,
        required: true,
        trim: true
    },
    completed:{
        type: Boolean,
        default: false
    },
    author: { 
        type: mongoose.SchemaTypes.ObjectId,
        require: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const  Task = mongoose.model('Task', taskSchema)
module.exports = Task