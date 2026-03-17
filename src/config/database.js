const mongoose = require("mongoose");

async function connectionMongoDB() {
    try {
        const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27019/meuBanco";
        await mongoose.connect(mongoUrl);
        console.log("MongoDB Conectado");
        console.log(mongoose.connection.client.s.url);
    } catch (error) {
        console.error(error);
    }
}

module.exports = connectionMongoDB;
