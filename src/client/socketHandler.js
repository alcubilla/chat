import {EVENTS} from '../../constants';

export default (socketClient,ui) =>{

    socketClient.on(EVENTS.BROADCAST_MESSAGE,(data) => {
        ui.messageList.innerHTML += `<div>
        <p>${data.userName}:${data.value} time: ${data.time}</p>
        </div>`
    });

    socketClient.on(EVENTS.BROADCAST_NAME,(activeUsers) => {
        ui.usersList.innerHTML = '' ;
        activeUsers.forEach(user =>{
        ui.usersList.innerHTML += `<p>${user.userName}</p>`;
        })
    });


    socketClient.on(EVENTS.BROADCAST_USERS, (userName)=>{  //cachamos lo que emitimos del server
        ui.usersList.innerHTML += `<p>${userName}</p>`;
    });

    //cachar la actualizacion del listado de usuarios en el cliente
    socketClient.on(EVENTS.BROADCAST_USER_LIST, (activeUsers) =>{
        ui.usersList.innerHTML = '' ;
        activeUsers.forEach(user =>{
        ui.usersList.innerHTML += `<p>${user.userName}</p>`;  //añadimos el nuevo listado
        });
    });

    socketClient.on(EVENTS.BROADCAST_SAVED_MESSAGE, (messageList) =>{
        ui.messageSaved.innerHTML = '' ; 
        messageList.forEach(message =>{
        ui.messageSaved.innerHTML += `<p>Id= ${message.id} / Usuario= ${message.userName} / Mensaje=${message.message}/ Date=${message.date}</p> `;  //añadimos el nuevo listado
        });
    });

}


