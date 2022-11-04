import mysql from "mysql";

const host: string = "mariadb";
const user: string = "root";
const password: string = "buyung";
const database: string = "gocery-node";

class MysqlDatabase {
  static pool: Promise<mysql.PoolConnection> =
    new Promise<mysql.PoolConnection>((resolve, reject) => {
      const pool: mysql.Pool = mysql.createPool({
        host: host,
        user: user,
        password: password,
        database: database,
      });

      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
        }

        resolve(connection);
      });
    });
}

export default MysqlDatabase;
