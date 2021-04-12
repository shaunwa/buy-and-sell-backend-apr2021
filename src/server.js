import Hapi from '@hapi/hapi';
import { initializeDbConnection, disconnectFromDb } from './db';

let server;

const start = async () => {
    server = Hapi.server({
        port: 8000,
        host: 'localhost',
    });

    initializeDbConnection();

    server.route({
        method: 'GET',
        path: '/hello/{name}',
        handler: (req, h) => {
            const name = req.params.name;
            return h.response(`Hello ${name}!`).code(201);
        }
    });

    server.route({
        method: 'POST',
        path: '/hello',
        handler: (req, h) => {
            const name = req.payload.name;
            return h.response(`Hello ${name}!`).code(201);
        }
    });

    await server.start();
    console.log(`Server is listening on ${server.info.uri}`);
}

process.on('unhandledRejection', err => {
    console.log(err);
    disconnectFromDb();
    process.exit(1);
});

process.on('SIGINT', async () => {
    await server.stop({ timeout: 10000 });
    disconnectFromDb();
    process.exit(0);
});

start();