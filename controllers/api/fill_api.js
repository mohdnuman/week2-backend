const Fill=require("../../models/fill");

module.exports.index=async function(req,res){

    let fills=await Fill.find({})
    .sort('-createdAt');
    return res.json(200,{
        message:"list of fills",
        fills:fills
    })
}