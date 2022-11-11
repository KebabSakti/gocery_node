import { QueryOptions } from "mysql";
import BundleModel from "../model/bundle_model";
import BundleRepository from "../repository/bundle_repository";
import Database from "../../../../core/service/mysql_database";

class BundleMysql implements BundleRepository {
  async index(): Promise<BundleModel[]> {
    const result = new Promise<BundleModel[]>((resolve, reject) => {
      Database.pool
        .then((connection) => {
          const query: QueryOptions = {
            sql: "select * from bundles where hidden = 0 and active = 1",
          };

          connection.query(query, (error, results) => {
            let bundles: BundleModel[] = [];

            if (error) {
              return reject(error);
            }

            if (results.length > 0) {
              bundles = Array.from(results, (e: BundleModel) => {
                return {
                  uid: e.uid,
                  name: e.name,
                  description: e.description,
                  image: e.image,
                };
              });
            }

            resolve(bundles);
          });
        })
        .catch((error) => {
          reject(error);
        });
    });

    return result;
  }
}

export default BundleMysql;
