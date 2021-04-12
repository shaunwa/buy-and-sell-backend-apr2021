import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hapi-server-apr2021',
    password: 'abc123!',
    database: 'buy-and-sell-apr2021',
});

export const initializeDbConnection = () => {
    return connection.connect();
}

export const disconnectFromDb = () => {
    return connection.end();
}

export const query = (queryString, escapedValues = []) => {
    return new Promise((resolve, reject) => {
        connection.query(queryString, escapedValues, (error, results) => {
            if (error) reject(error);
            resolve(results);
        });
    })
}