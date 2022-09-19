const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    database: 'jitu',
    password: '7709840106',
});

if (conn) {
    console.log('connection is successfully CONNECT TO DATABASE..');
} else {
    console.log('connection is not connected to DB');
}

module.exports = conn;
