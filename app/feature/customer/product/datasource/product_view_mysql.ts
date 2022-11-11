import PaginationOption from "../../../../core/model/pagination_option";
import ProductViewModel from "../model/product_view_model";
import ProductViewRepository from "../repository/product_view_repository";
import QueryBuilder from "../../../../core/service/query_builder";
import Database from "../../../../core/service/mysql_database";
import { QueryOptions } from "mysql";
import HelperService from "../../../../core/service/helper_service";

class ProductViewMysql implements ProductViewRepository {
  async index(
    customer_uid: string,
    paginationOption?: PaginationOption | undefined
  ): Promise<ProductViewModel[]> {
    const result: Promise<ProductViewModel[]> = new Promise<ProductViewModel[]>(
      (resolve, reject) => {
        Database.pool
          .then((connection) => {
            const queryBuilder: QueryBuilder = new QueryBuilder({
              table: "product_views v",
            });

            queryBuilder.fields = ["v.*, p.image"];

            queryBuilder.joins = [`join products p on v.product_uid = p.uid`];

            queryBuilder.wheres = [
              `v.customer_uid = ${connection.escape(customer_uid)}`,
            ];

            queryBuilder.sorts = ["v.updated_at desc"];

            if (paginationOption != undefined) {
              queryBuilder.pagings = paginationOption;
            }

            const query: QueryOptions = {
              sql: queryBuilder.query,
            };

            connection.query(query, (error, results) => {
              let views: ProductViewModel[] = [];

              if (error) {
                return reject(error);
              }

              if (results.length > 0) {
                views = Array.from(results, (e: ProductViewModel) => {
                  return {
                    uid: e.uid,
                    customer_uid: e.customer_uid,
                    product_uid: e.product_uid,
                    image: e.image,
                  };
                });
              }

              resolve(views);
            });
          })
          .catch((error) => {
            reject(error);
          });
      }
    );

    return result;
  }

  async store(productViewModel: ProductViewModel): Promise<void> {
    const result: Promise<void> = new Promise<void>((resolve, reject) => {
      Database.pool
        .then((connection) => {
          const queryBuilder: string = `insert into product_views set
                                        uid = ?,
                                        customer_uid = ?
                                        product_uid = ?
                                        created_at = ?
                                        updated_at = ?`;

          const query: QueryOptions = {
            sql: queryBuilder,
            values: [
              HelperService.uuid(),
              productViewModel.customer_uid,
              productViewModel.product_uid,
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
}

export default ProductViewMysql;
