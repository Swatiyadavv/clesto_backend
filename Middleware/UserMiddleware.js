const multer = require('multer')
let upload_storage = multer.diskStorage({
     destination:function(req,file,cb)
     {
         cb(null,'./upload')
     },
     filename:function(req,file,cb)
     {
           let img = file.originalname.split(".")
           cb(null,file.originalname);
     }
})
const upload1 = multer({storage:upload_storage})

const verifyext = async (req, res, next) => {
    try {
        const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (req.file && allowedMimeTypes.includes(req.file.mimetype)) {
            next();
        } else {
            res.status(404).send({ message: "extension did not match" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error during file validation", error: error.message });
    }
};


    module.exports ={verifyext,upload1}