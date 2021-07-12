const mongoose = require('mongoose');

const dbConnection = async () => {
    try{
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log("DB online");

    }catch(error){
        throw new Error("Error al conectar con la base de datos. Comuníquese con su administrador");
    }
}

module.exports = {
    dbConnection
}