const mongoose = require("mongoose");

const fromSchema = mongoose.Schema({
    name:String,
    age:Number,
    email:String,
   
},{
    timestamps:true
});

const fromModel = mongoose.model("from",fromSchema);
module.exports =fromModel;
