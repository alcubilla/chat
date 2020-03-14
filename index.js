import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import socketio from 'socket.io'
import socketHandler from './src/server/socketHandler'

dotenv.config();

const APP=express();

const SERVER =http.createServer(APP);



APP.use (express.static('dist'));
APP.set('views','./src/server/views');
APP.set('view engine', 'pug');
APP.use(bodyParser.json());

const io= socketio(SERVER);

const activeUsers=[];
const messagesList=[];

io.set('transports', ['websocket','polling']); //le da prioridad por websocket para la comunicacion,si no se puede...por polling
io.on('connection',socketHandler(io,activeUsers,messagesList)); //mientras tengamos coneccion haz esto , le pasamos la instancia io que creamos

APP.get('/',(req,res)=>{
    res.render('home');
});

SERVER.listen(3000);