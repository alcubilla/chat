import socketHandler from './socketHandler'; //eventos de socket para cliente
import uiHandler from './uiHandler'; //listeners para el formulario 


const socketClient = io();
const ui = uiHandler(socketClient); //uiHandler para el html

socketHandler(socketClient, ui); //recibir los eventos del back
