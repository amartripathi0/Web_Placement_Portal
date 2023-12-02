const errorHandler = (err ,req , res , next) =>{

    
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)

    // console.log(statusCode,err, err.message);
    console.log(err.message);
    if(statusCode === 500){
        res.json({
            message : "Internal Server Error"
        })
    }
    else{        
        res.json({
            message : err.message
        })
    }
    
}

module.exports = errorHandler  