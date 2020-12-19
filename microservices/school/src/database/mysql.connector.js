const mysql = require('mysql2');

class MySqlConnector {
  connection = null;

  constructor() {

      // console.log('in mysql.connector, process.env is ', process.env);
    const mySqlConnection = mysql
      .createPool({
        connectionLimit: 5,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        dateStrings: true,
      })
      .promise();

    this.connection = mySqlConnection;
  }

  getConnection() {
    return this.connection;
  }
}

class Singleton {
  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = new MySqlConnector();
    }
  }

  getInstance() {
    return Singleton.instance;
  }
}

module.exports = Singleton;
