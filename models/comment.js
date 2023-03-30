var mongoose = require('mongoose')
var commentSchema = new mongoose.Schema({
    author: String,
    body: String,
    created: {type: Date, default: Date.now()},
},
{ timestamps: true },
)

module.exports = mongoose.model("Comment", commentSchema)