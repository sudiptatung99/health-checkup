exports.admin=(req,res,next)=>{
if(req.user.isAdmin=='admin'){
        next()
     
    }else{
         res.status(400).json("Access denied")
    }
}