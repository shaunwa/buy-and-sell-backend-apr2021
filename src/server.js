import Hapi from '@hapi/hapi';
import { initializeDbConnection, disconnectFromDb } from './db';
import { getAllListingsRoute } from './routes/getAllListingsRoute';

let server;

const start = async () => {
    server = Hapi.server({
        port: 8000,
        host: 'localhost',
    });

    initializeDbConnection();

    server.route(getAllListingsRoute);

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