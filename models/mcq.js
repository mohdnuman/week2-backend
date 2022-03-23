const mongoose=require('mongoose');

const mcqSchema=new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    options:[
        {
            type:String,
            required:true
        }
    ],
    answer:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

const Mcq=mongoose.model('Mcq',mcqSchema);
module.exports=Mcq;