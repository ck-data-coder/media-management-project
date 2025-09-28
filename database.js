import mongoose from 'mongoose'
const databaseUrl='mongodb://localhost:27017/videoproject'
mongoose.connect(databaseUrl,).then(()=>{
    console.log('database connected')
}).catch((err)=>{
    console.log('err',err)
})