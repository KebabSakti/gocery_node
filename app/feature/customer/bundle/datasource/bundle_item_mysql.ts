import { QueryOptions } from "mysql";
import BundleItemRepository from "../repository/bundle_item_repository";
import Database from "../../../../core/service/mysql_database";
import BundleItemModel from "../model/bundle_item_model";
import QueryBuilder from "../../../../core/service/query_builder";
import PaginationOption from "../../../../core/model/pagination_option";

class BundleItemMysql implements BundleItemRepository {
  async index(
    bundle_uid: string,
    paginationOption?: PaginationOption
  ): Promise<BundleItemModel[]> {
    const result = new Promise<BundleItemModel[]>((resolve, reject) => {
      Database.pool
        .then((connection) => {
          const queryBuilder: QueryBuilder = new QueryBuilder({
            table: "bundle_products b",
          });

          queryBuilder.fields = [
            "b.bundle_uid",
            "p.*",
            "c.category_uid",
            "m.name as unit_name",
            "u.count as unit_count",
            "s.fixed as discount_type",
            "s.amount as discount_amount",
          ];

          queryBuilder.joins = [
            "join products p on b.product_uid = p.uid",
            "join product_categories c on c.product_uid = p.uid",
            "join product_units u on u.product_uid = p.uid",
            "join unit_measures m on u.unit_measure_uid = m.uid",
            "left join product_discounts d on d.product_uid = p.uid",
            "left join discounts s on d.discount_uid = s.uid",
          ];

          queryBuilder.wheres = [
            `b.bundle_uid = ${connection.escape(bundle_uid)}`,
          ];

          if (paginationOption != undefined) {
            queryBuilder.pagings = paginationOption;
          }

          const query: QueryOptions = {
            sql: queryBuilder.query,
          };

          console.log(query.sql);

          connection.query(query, (error, results) => {
            let bundleItems: BundleItemModel[] | [] = [];

            if (error) {
              return reject(error);
            }

            if (results.length > 0) {
              bundleItems = Array.from(results, (e: BundleItemModel) => {
                return {
                  uid: e.uid,
                  bundle_uid: e.bundle_uid,
                  product_uid: e.product_uid,
                  category_uid: e.category_uid,
                  name: e.name,
                  description: e.description,
                  image: e.image,
                  price: e.price,
                  point: e.point,
                  min: e.min,
                  max: e.max,
                  link: e.link,
                  unit_name: e.unit_name,
                  unit_count: e.unit_count,
                  discount_type: e.discount_type,
                  discount_amount: e.discount_amount,
                };
              });
            }

            resolve(bundleItems);
          });
        })
        .catch((error) => {
          reject(error);
        });
    });

    return result;
  }
}

export default BundleItemMysql;
