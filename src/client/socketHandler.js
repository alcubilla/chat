import {EVENTS} from '../../constants';

export default (socketClient,ui) =>{

    socketClient.on(EVENTS.BROADCAST_SAVED_MESSAGE, messages =>{
        ui.messageSaved.innerHTML = '' ; 
        messages.forEach(message =>{
        ui.messageSaved.innerHTML += `<p>${message.userName} says ${message.value} At ${message.currentDate}</p> `;  //añadimos el nuevo listado
        });
    });
    
    socketClient.on(EVENTS.BROADCAST_USER_LIST, activeUsers =>{
        ui.usersList.innerHTML ='';
        activeUsers.forEach(user =>{
        ui.usersList.innerHTML += `<p>${user.userName}</p>`; 
         });
     });  

    socketClient.on(EVENTS.BROADCAST_USERS_RECENT, data =>{
        console.log(data)
        ui.recentUsers.innerHTML ='';
        data.forEach(user=>{
            ui.recentUsers.innerHTML += `<p> ${user.userName} conected at= ${user.LastConnection}</p>`;
        })
    })

    socketClient.on(EVENTS.BROADCAST_MESSAGE,(data) => {
        ui.messageList.innerHTML += `<div>
        <p>${data.userName}:${data.value} time: ${data.currentDate}</p>
        </div>`
    });

    
  

}
