const mongoose = require('mongoose')

const dbConnect = () => {

    const db_uri = process.env.DB_URI

    mongoose.set('strictQuery', false)

    try {

        mongoose.connect(db_uri, { dbName: 'practica_final_web' })
    }
    catch (error) {

        console.err("Error conectando a la BD:", error)
    }

    //Listen events
    mongoose.connection.on("connected", () => console.log("Conectado a la BD"))
}

module.exports = dbConnect