import {EVENTS} from '../../constants'

export default (io,activeUsers,messages,connection,current) => (socket)=>{

    socket.on(EVENTS.TEST, (data) => {
    console.log('test connection', data);
    });

   
    io.emit(EVENTS.BROADCAST_SAVED_MESSAGE, messages); //trae mensajes guardados al inicio

    current = connection.query('select userName,LastConnection from users where lastConnection >= now() - interval 60*60 second' , (err,results)=>{
     io.emit(EVENTS.BROADCAST_USERS_RECENT, results);}) //trae los ultimos que se conectaron al inicio
   
    socket.on(EVENTS.SEND_MESSAGE, (data) =>{
        data.currentDate = Date.now(); 
        messages.push(data);
        connection.query('insert into messages (message, userName) values (?,?)',[data.value, data.userName],(err,result)=>{
            if(!err){io.emit(EVENTS.BROADCAST_MESSAGE, data);}
        })
    });//Envia mensaje al dar click en enviar a todos los conectados

    socket.on(EVENTS.SEND_NAME, (data) =>{
        activeUsers = activeUsers.filter(u => u.userName !== data.userName)
        activeUsers.push({ id: socket.id, userName: data.userName})
        io.emit(EVENTS.BROADCAST_USER_LIST, activeUsers);

        connection.query('select * from users where userName= ?', [data.userName], (err,result)=>{
            if(result.length === 0){
            connection.query('insert into users (userName) values (?)', [data.userName])}
            else{ 
            connection.query('update users set lastConnection = now() where userName = ?', [data.userName]);}  
        })
    })

    io.emit(EVENTS.BROADCAST_USER_LIST, activeUsers);

    socket.on(EVENTS.DISCONNECT,()=>{
        const disconnectedUser= activeUsers.find(u => u.id === socket.id);
        activeUsers = activeUsers.filter(u => u.id !== socket.id);
        if (disconnectedUser){
            connection.query('update users set lastConnection = now() where userName = ?',[disconnectedUser.userName]);
        }
        io.emit(EVENTS.BROADCAST_USER_LIST, activeUsers)  //broadcast a los usuarios activos
    });

};