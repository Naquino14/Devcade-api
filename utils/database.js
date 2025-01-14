const config = require('./config');
const logger = require('../utils/logger');
const pg = require('pg');

const openConnection = async (callback) => {
    const client = new pg.Client({
        host: config.PSQL_URI,
        user: config.PSQL_USER,
        port: config.PSQL_PORT,
        password: config.PSQL_PASS,
        database: config.PSQL_USER,
        ssl: true
    });

    logger.info(`connecting to {
        host: ${client.host},
        user: ${client.user},
        port: ${client.port},
        password: ${client.password},
        database: ${client.database}
    }`);

    try {
        await client.connect()
            .then(res => console.log("Connected to DB"));
        await callback(client);
    } finally {
        await client.end();
    }
};

module.exports = {
    openConnection
};