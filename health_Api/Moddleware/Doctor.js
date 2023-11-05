exports.admin=(req,res,next)=>{
    if(req.user.role=='doctor'){
        next()
     
    }else{
         res.status(400).json("Access denied")
    }
}