import {EVENTS} from '../../constants';

export default (socketClient) =>{
    socketClient.emit(EVENTS.TEST, {values: 'hello'});
    const message =document.getElementById('message');  //mensaje
    const sendMessage= document.getElementById('send-message'); //boton mensaje
    const messageList= document.getElementById('messages-list');  //div
    const userName = document.getElementById('user-name'); //nombre
    const usersList=document.getElementById('users-list'); //div
    const messageSaved= document.getElementById('messages-saved'); //div
    const sendName = document.getElementById('send-name'); //boton acutaliza nombres
   //saca los elementos del html

    

    sendMessage.addEventListener('click', ()=>{ 
        if( message.value.length >0 && userName.value.length > 0)
        {
        socketClient.emit(EVENTS.SEND_MESSAGE, 
            {value: message.value, 
            userName:userName.value}
        );
        message.value= '';
    }});

    sendName.addEventListener('click', ()=>{ 
        if(userName.value.length > 0 )
        {
        socketClient.emit(EVENTS.SEND_NAME, {newName: userName.value})
        console.log(data.newName)
    }
    });


return{
    usersList,
    messageList,  //por que el uihandler recibe como objeto el ui
    messageSaved
}
}