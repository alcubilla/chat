//carga los eventos 

import {EVENTS} from '../../constants'
export default (io, activeUsers, messagesList) => (socket)=>{

    io.emit(EVENTS.BROADCAST_SAVED_MESSAGE, messagesList);  //mensajes guardados
    io.emit(EVENTS.BROADCAST_USER_LIST, activeUsers);

    socket.on(EVENTS.TEST, (data) => {
    console.log('test connection', data);
    });//prueba de conexión

    socket.on(EVENTS.SEND_MESSAGE, (data) =>{
        data.time = Date.now(); //Hora
        // const active= activeUsers.find(p=> p.userName == data.userName)
        // if(!active){
        //     activeUsers.push({
        //     id: socket.id,
        //     userName: data.userName
        //     });
        //     console.log(activeUsers)
        //     io.emit(EVENTS.BROADCAST_USERS,data.userName) //emitimos un nuevo broadcast
        // }
        messagesList.push(data);
        io.emit(EVENTS.BROADCAST_MESSAGE, data);
       

        // messagesList.push({
        //     id: socket.id,
        //     userName: data.userName,
        //     message: data.value,
        //     date: data.time
        // });
    });

    socket.on(EVENTS.SEND_NAME, (data) =>{
        const active= activeUsers.find(p=> p.id == socket.id)
        if(active){
            active.userName = data.newName
        }
        io.emit(EVENTS.BROADCAST_NAME, activeUsers);
        console.log(activeUsers)
    });

    socket.on(EVENTS.DISCONNECT,()=>{
        activeUsers = activeUsers.filter(u => u.id !== socket.id);
        console.log('disconnect', socket.id);
        console.log (activeUsers);
        io.emit(EVENTS.BROADCAST_USER_LIST, activeUsers)  //broadcast a los usuarios activos
    });

};