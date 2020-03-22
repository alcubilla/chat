import {EVENTS} from '../../constants';

export default (socketClient) =>{
    socketClient.emit(EVENTS.TEST, {values: 'hello'});
    const userName = document.getElementById('user-name'); //nombre
    const sendName = document.getElementById('send-name'); //boton acutaliza nombres

    const message =document.getElementById('message');  //mensaje
    const sendMessage= document.getElementById('send-message'); //boton mensaje

    const messageList= document.getElementById('messages-list');  //div 
    const usersList=document.getElementById('users-list'); //div
    const messageSaved= document.getElementById('messages-saved'); //div
    const recentUsers=document.getElementById('active-users');//conectados recientes
  
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
        socketClient.emit(EVENTS.SEND_NAME, {userName: userName.value})
    }
    });


return{
    usersList,
    messageList,  //por que el uihandler recibe como objeto el ui
    messageSaved,
    recentUsers

}
}