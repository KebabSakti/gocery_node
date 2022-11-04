import CategoryModel from "../model/category_model";
import CategoryRepository from "../repository/category_repository";
import Database from "../../../../core/service/mysql_database";
import { QueryOptions } from "mysql";
import { ResourceNotFound } from "../../../../core/config/errors";

class CategoryMysql implements CategoryRepository {
  async category(uid: string): Promise<CategoryModel | null> {
    const result: Promise<CategoryModel | null> =
      new Promise<CategoryModel | null>((resolve, reject) => {
        Database.pool
          .then((connection) => {
            const query: QueryOptions = {
              sql: "select * from categories where uid = ? and active = 1",
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

  async categories(): Promise<CategoryModel[] | []> {
    const result: Promise<CategoryModel[] | []> = new Promise<
      CategoryModel[] | []
    >((resolve, reject) => {
      Database.pool
        .then((connection) => {
          const query: QueryOptions = {
            sql: "select * from categories where active = 1",
          };

          connection.query(query, (error, results) => {
            if (error) {
              return reject(error);
            }

            if (results.length == 0) {
              return resolve([]);
            }

            resolve(results);
          });
        })
        .catch((error) => {
          reject(error);
        });
    });

    return result;
  }
}

export default CategoryMysql;
