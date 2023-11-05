
const multer = require("multer");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname)
   },
  })

const upload = multer({ 
  storage: storage ,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" ) {
      cb(null, true);
    }else{
      cb(null,false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
    
  },
  limits:{
    fileSize:512000
  }

})





module.exports = { upload }


