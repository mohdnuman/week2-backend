const Code=require("../../models/code");

module.exports.index=async function(req,res){

    let code=await Code.findOne({})
    .sort('-createdAt');
    return res.json(200,{
        message:"Coding problem",
        code:code
    })
}