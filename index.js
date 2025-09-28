import express from 'express'
import './database.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import router from './router.js'
const server=express();
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended:true}))
server.use(cors())
server.use('/',router);
server.listen(8080);