import SearchModel from "../model/search_model";
import SearchRepository from "../repository/search_repository";
import Database from "../../../../core/service/mysql_database";
import { QueryOptions } from "mysql";
import HelperService from "../../../../core/service/helper_service";
import SearchOption from "../model/search_option";
import PaginationOption from "../../../../core/model/pagination_option";

class SearchMysql implements SearchRepository {
  async searches(
    searchOption?: SearchOption,
    paginationOption?: PaginationOption
  ): Promise<SearchModel[]> {
    const result: Promise<SearchModel[]> = new Promise<SearchModel[]>(
      (resolve, reject) => {
        Database.pool
          .then((connection) => {
            let queryBuilder: string = "select * from searches";

            let wheres: string[] = [];

            if (searchOption != undefined) {
              if (searchOption.customer_uid != undefined) {
                wheres = [...wheres, wheres.length == 0 ? "where" : "and"];

                wheres = [
                  ...wheres,
                  `customer_uid = ${connection.escape(
                    searchOption.customer_uid
                  )}`,
                ];
              }

              if (searchOption.keyword != undefined) {
                wheres = [...wheres, wheres.length == 0 ? "where" : "and"];

                wheres = [
                  ...wheres,
                  `keyword like "%"${connection.escape(
                    searchOption.keyword
                  )}"%"`,
                ];
              }
            }

            queryBuilder += ` ${wheres.join(" ")}
                            group by keyword
                            order by keyword asc`;

            if (paginationOption != undefined) {
              queryBuilder = HelperService.paginate(
                queryBuilder,
                paginationOption
              );
            }

            const query: QueryOptions = {
              sql: queryBuilder,
            };

            console.log(query.sql);

            connection.query(query, (error, results) => {
              let searches: SearchModel[] = [];

              if (error) {
                return reject(error);
              }

              if (results.length > 0) {
                searches = Array.from(results, (e: SearchModel) => {
                  return {
                    uid: e.uid,
                    customer_uid: e.customer_uid,
                    keyword: e.keyword,
                  };
                });
              }

              resolve(searches);
            });
          })
          .catch((error) => {
            reject(error);
          });
      }
    );

    return result;
  }

  async store(searchModel: SearchModel): Promise<void> {
    const result: Promise<void> = new Promise<void>((resolve, reject) => {
      Database.pool
        .then((connection) => {
          const queryBuilder: string = `insert into searches set
                                        uid = ?,
                                        customer_uid = ?
                                        keyword = ?
                                        created_at = ?
                                        updated_at = ?`;

          const query: QueryOptions = {
            sql: queryBuilder,
            values: [
              searchModel.uid,
              searchModel.customer_uid,
              searchModel.keyword,
              HelperService.sqlDateNow(),
              HelperService.sqlDateNow(),
            ],
          };

          connection.query(query, (error, _) => {
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

  async remove(uid: string): Promise<void> {
    const result: Promise<void> = new Promise<void>((resolve, reject) => {
      Database.pool
        .then((connection) => {
          const queryBuilder: string = `delete from searches where uid = ?`;

          const query: QueryOptions = {
            sql: queryBuilder,
            values: [uid],
          };

          connection.query(query, (error, _) => {
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

export default SearchMysql;
