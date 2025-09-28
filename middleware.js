import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import multer from 'multer';
dotenv.config()

const JWT_SECRET=process.env.JWT_SECRET
function authenticateToken(req, res, next) {
    //  console.log(req.body)
      const authHeader = req.headers['authorization'];
     
      const token = authHeader && authHeader.split(' ')[1]; // Extract the token from 'Bearer <token>'
     console.log(token)
      if (token=='null') return res.status(401).send({message:"please login"}); // No token provided
    
      jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send({message:"session expired please login again"}); // Invalid token
    
        req.user = user; // Attach user info to the request
        next(); // Continue to the next middleware/route handler
      });
    }

    const storage=multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,'uploads/')
        },
        filename: function(req,file,cb){
            cb(null,file.originalname)
        }
    })
    const upload =multer({storage:storage})

    const categorystorage=multer.diskStorage({
      destination:function(req,file,cb){
          cb(null,'uploadCategoryFiles/')
      },
      filename: function(req,file,cb){
          cb(null,file.originalname)
      }
  })
  
  const uploadCategory =multer({storage:categorystorage})

export {authenticateToken,upload,uploadCategory}