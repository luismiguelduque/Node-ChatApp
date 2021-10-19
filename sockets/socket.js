const {validateJWT} = require("../helpers/jwt");
const { io } = require('../index');
const { userConnected, userDisconnected, saveMessage  } = require('../controllers/socket');


// Sockets messages
io.on('connection', async (client) => {

    const [valid, uid] = validateJWT(client.handshake.headers['x-token']);
    if(!valid){
        return client.disconnect();
    }

    await userConnected(uid);

    // Enter to specific room
    // global room

    // user room
    client.join(uid)

    // Listen personal message
    client.on('personal-message', async (payload)=>{
        await saveMessage(payload);
        io.to(payload.to).emit('personal-message', payload);
    });

    client.on('disconnect', async () => {
        await userDisconnected(uid)
    });

    client.on('mensaje', ( payload ) => {
        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );
    });

});
