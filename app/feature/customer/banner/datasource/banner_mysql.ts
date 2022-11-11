import BannerModel from "../model/banner_model";
import BannerRepository from "../repository/banner_repository";
import Database from "../../../../core/service/mysql_database";
import { QueryOptions } from "mysql";

class BannerMysql implements BannerRepository {
  async index(): Promise<BannerModel[]> {
    const result = new Promise<BannerModel[]>((resolve, reject) => {
      Database.pool
        .then((connection) => {
          const query: QueryOptions = {
            sql: "select * from banners where active = 1",
          };

          connection.query(query, (error, results) => {
            let banners: BannerModel[] = [];

            if (error) {
              return reject(error);
            }

            if (results.length > 0) {
              banners = Array.from(results, (e: BannerModel) => {
                return {
                  uid: e.uid,
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
}

export default BannerMysql;
