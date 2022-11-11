import { QueryOptions } from "mysql";
import Database from "../../../../core/service/mysql_database";
import CustomerModel from "../model/customer_model";
import CustomerRepository from "../repository/customer_repository";
import { DateTime } from "luxon";

const now: string = DateTime.utc().toFormat("yyyy-LL-dd hh:mm:ss");

class CustomerMysql implements CustomerRepository {
  async show(uid: string): Promise<CustomerModel | null> {
    const result = new Promise<CustomerModel | null>((resolve, reject) => {
      Database.pool
        .then((connection) => {
          const query: QueryOptions = {
            sql: "select * from customers where uid = ? and active = 1",
            values: [uid],
          };

          connection.query(query, (error, results) => {
            let customer: CustomerModel | null = null;

            if (error) {
              return reject(error);
            }

            if (results.length > 0) {
              const e: CustomerModel = results[0];

              customer = {
                uid: e.uid,
                name: e.name,
                email: e.email,
                phone: e.phone,
              };
            }

            resolve(customer);
          });
        })
        .catch((error) => {
          reject(error);
        });
    });

    return result;
  }

  async update(customer: CustomerModel): Promise<void> {
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

            resolve();
          });
        })
        .catch((error) => {
          reject(error);
        });
    });

    return result;
  }

  async store(customer: CustomerModel): Promise<void> {
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
