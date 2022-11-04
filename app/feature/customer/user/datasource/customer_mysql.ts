import { QueryOptions } from "mysql";
import Database from "../../../../core/service/mysql_database";
import CustomerModel from "../model/customer_model";
import CustomerRepository from "../repository/customer_repository";
import {
  InternalServerError,
  ResourceNotFound,
} from "../../../../core/config/errors";
import { DateTime } from "luxon";

const now: string = DateTime.utc().toFormat("yyyy-LL-dd hh:mm:ss");

class CustomerMysql implements CustomerRepository {
  async getUser(uid: string): Promise<CustomerModel | null> {
    const result: Promise<CustomerModel | null> =
      new Promise<CustomerModel | null>((resolve, reject) => {
        Database.pool
          .then((connection) => {
            const query: QueryOptions = {
              sql: "select * from customers where uid = ? and active = 1",
              values: [uid],
            };

            connection.query(query, (error, results) => {
              if (error) {
                return reject(error);
              }

              if (results.length == 0) {
                return resolve(null);
              }

              resolve(results[0]);
            });
          })
          .catch((error) => {
            reject(error);
          });
      });

    return result;
  }

  async updateUser(customer: CustomerModel): Promise<void> {
    const result: Promise<void> = new Promise<void>((resolve, reject) => {
      Database.pool
        .then((connection) => {
          const query: QueryOptions = {
            sql: "update customers set name = ?, email = ?, phone = ?, updated_at = ? where uid = ?",
            values: [
              customer.name,
              customer.email,
              customer.phone,
              now,
              customer.uid,
            ],
          };

          connection.query(query, (error, results) => {
            if (error) {
              return reject(error);
            }

            if (results.affectedRows == 0) {
              return reject(new ResourceNotFound("User not found"));
            }

            resolve();
          });
        })
        .catch((error) => {
          reject(error);
        });
    });

    return result;
  }

  async insertUser(customer: CustomerModel): Promise<void> {
    const result: Promise<void> = new Promise<void>((resolve, reject) => {
      Database.pool
        .then((connection) => {
          const query: QueryOptions = {
            sql: "insert into customers set uid = ?, name = ?, email = ?, phone = ?, created_at = ?, updated_at = ?",
            values: [
              customer.uid,
              customer.name,
              customer.email,
              customer.phone,
              now,
              now,
            ],
          };

          connection.query(query, (error, results) => {
            if (error) {
              return reject(error);
            }

            if (results.affectedRows == 0) {
              return reject(new InternalServerError("Insert new user failed"));
            }

            resolve();
          });
        })
        .catch((error) => {
          reject(error);
        });
    });

    return result;
  }
}

export default CustomerMysql;
