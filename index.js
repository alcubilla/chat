import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import socketio from 'socket.io'
import socketHandler from './src/server/socketHandler'
import connection from './modules/connection'

dotenv.config();
const APP=express();
const SERVER =http.createServer(APP);

APP.use (express.static('dist'));
APP.set('views','./src/server/views');
APP.set('view engine', 'pug');
APP.use(bodyParser.json());

const io= socketio(SERVER);

let activeUsers=[];
let messages=[];
let current=[];

io.set('transports', ['websocket','polling']);



connection.query('select * from messages', (err, results)=>{
        messages = results.map((message)=>{
            return {
                userName: message.userName,
                value: message.message,
                currentDate: message.createdAt
            }

})
io.on('connection', socketHandler(io,activeUsers,messages,connection,current));
})



APP.get('/',(req,res)=>{
    res.render('home');
});

SERVER.listen(3000);