const mongoose=require('mongoose');

const codeSchema=new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    test1:{
        type:String,
        required:true
    },
    answer1:{
        type:String,
        required:true
    },
    test2:{
        type:String,
        required:true
    },
    answer2:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

const Code=mongoose.model('Code',codeSchema);
module.exports=Code;