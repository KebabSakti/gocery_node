import { QueryOptions } from "mysql";
import BundleModel from "../model/bundle_model";
import BundleRepository from "../repository/bundle_repository";
import Database from "../../../../core/service/mysql_database";

class BundleMysql implements BundleRepository {
  async bundles(): Promise<BundleModel[]> {
    const result = new Promise<BundleModel[]>((resolve, reject) => {
      Database.pool
        .then((connection) => {
          const query: QueryOptions = {
            sql: "select * from bundles where hidden = 0 and active = 1",
          };

          connection.query(query, (error, results) => {
            let banners: BundleModel[] = [];

            if (error) {
              return reject(error);
            }

            if (results.length > 0) {
              banners = Array.from(results, (e: BundleModel) => {
                return {
                  uid: e.uid,
                  name: e.name,
                  description: e.description,
                  image: e.image,
                };
              });
            }

            resolve(banners);
          });
        })
        .catch((error) => {
          reject(error);
        });
    });

    return result;
  }

  async bundle(uid: string): Promise<BundleModel | null> {
    const result = new Promise<BundleModel | null>((resolve, reject) => {
      Database.pool
        .then((connection) => {
          const query: QueryOptions = {
            sql: "select * from bundles where uid = ? and active = 1",
            values: [uid],
          };

          connection.query(query, (error, results) => {
            let bundle: BundleModel | null = null;

            if (error) {
              return reject(error);
            }

            if (results.length > 0) {
              const e: BundleModel = results[0];

              bundle = {
                uid: e.uid,
                name: e.name,
                description: e.description,
                image: e.image,
              };
            }

            resolve(bundle);
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
