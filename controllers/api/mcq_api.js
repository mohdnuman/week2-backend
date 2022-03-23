const Mcq=require("../../models/mcq");

module.exports.index=async function(req,res){

    let mcqs=await Mcq.find({})
    .sort('-createdAt');
    return res.json(200,{
        message:"list of mcqs",
        mcqs:mcqs
    })
}