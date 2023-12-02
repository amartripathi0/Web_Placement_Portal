const multer = require("multer");

const pdfConfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./temp/resume")
    },
    filename:(req,file,callback)=>{
        callback(null,`${Date.now()}_${file.originalname}`)
    }
})


const isPdf =  (req , file , cb) => {
    if(file.mimetype === "application/pdf") {
        cb(null , true)
    }
    else{
        res.status(401)
        throw new Error("Uploaded file is not pdf.")
    }
}

const uploadPdf = multer({
    storage : pdfConfig ,
    fileFilter : isPdf
})

const imgConfig = multer.diskStorage({
    
    destination : (req , file , cb) => {
        cb(null , "./temp/profilePhoto")
    },
    filename:(req,file,callback)=>{
        callback(null,`${Date.now()}_${file.originalname}`)
    }
})
const isImage =  (req , file , cb) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png" ) {
        cb(null , true)
    }
    // else if(){

    // }
    else{
        cb(new Error("Uploaded file is not an image."))
    }
}
const uploadImg = multer({
    storage : imgConfig ,
    fileFilter : isImage
})
module.exports = {
uploadPdf , uploadImg
}