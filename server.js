const app = require('./src/app');
const connectmongo = require("./src/config/database");

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

async function startServer() {
    await connectmongo();

    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta: ${PORT}`);
    });
}

startServer()
