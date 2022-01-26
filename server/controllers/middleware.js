const Auth = async (req,res,next) => {
    const newToken = req.headers.authorization;
    const token = process.env.API_TOKEN;
    if(token===newToken){
        next(); 
    } else {
        return res.status(401).send({
            status:0,
            message:"Your are not authorized"
        });
    }
    
}

module.exports = Auth