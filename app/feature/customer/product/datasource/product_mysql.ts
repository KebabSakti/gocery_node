import PaginationOption from "../../../../core/model/pagination_option";
import ProductModel from "../model/product_model";
import ProductOption from "../model/product_option";
import ProductRepository from "../repository/product_repository";
import Database from "../../../../core/service/mysql_database";
import HelperService from "../../../../core/service/helper_service";
import { QueryOptions } from "mysql";

class ProductMysql implements ProductRepository {
  products(
    productOption?: ProductOption | undefined,
    paginationOption?: PaginationOption | undefined
  ): Promise<ProductModel[]> {
    const result = new Promise<ProductModel[]>((resolve, reject) => {
      Database.pool
        .then((connection) => {
          let select = `select 
                        p.*, 
                        m.name as unit_name,
                        u.count as unit_count,
                        s.fixed as discount_type, s.amount as discount_amount`;

          let from = ` from products p`;

          let join = ` join product_units u on u.product_uid = p.uid
                       join unit_measures m on u.unit_measure_uid = m.uid
                       left join product_discounts d on d.product_uid = p.uid
                       left join discounts s on d.discount_uid = s.uid`;

          let where = ` where p.active = 1`;

          let group = ``;

          let order = ``;

          if (productOption != undefined) {
            if (productOption.sold != undefined) {
              select += `,sum(o.qty) as sold`;

              join += ` join order_products o on o.product_uid = p.uid`;

              where += ` and p.uid in (select product_uid from order_products
                         join orders on order_products.order_uid = orders.uid
                         join order_statuses on order_statuses.order_uid = orders.uid
                         where order_statuses.status = "completed")`;

              group = ` group by p.uid`;

              order = ` order by sold desc`;
            }

            if (productOption.bundle_uid != undefined) {
              where += ` and p.uid in (select product_uid from bundle_products where bundle_uid = ${connection.escape(
                productOption.bundle_uid
              )})`;
            }

            if (productOption.search != undefined) {
              where += ` and p.name like "%"${connection.escape(
                productOption.search
              )}"%"`;
            }

            if (productOption.category_uid != undefined) {
              select += `,c.category_uid`;

              join += ` join product_categories c on c.product_uid = p.uid`;

              where += ` and c.category_uid = ${connection.escape(
                productOption.category_uid
              )}`;
            }

            if (
              productOption.cheapest != undefined ||
              productOption.discount != undefined ||
              productOption.point != undefined
            ) {
              order += ` order by`;
            }

            if (productOption.cheapest != undefined) {
              order += ` p.price asc`;
            }

            if (productOption.discount != undefined) {
              order += ` discount_amount desc`;
            }

            if (productOption.point != undefined) {
              order += ` ,p.point desc`;
            }
          }

          let queryBuilder = select + from + join + where + group + order;

          console.group(queryBuilder);

          const query: QueryOptions = {
            sql:
              paginationOption == null
                ? queryBuilder
                : HelperService.paginate(queryBuilder, paginationOption),
          };

          connection.query(query, (error, results) => {
            let products: ProductModel[] = [];

            if (error) {
              return reject(error);
            }

            if (results.length > 0) {
              products = Array.from(results, (e: ProductModel) => {
                return {
                  uid: e.uid,
                  name: e.name,
                  image: e.image,
                };
              });
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

export default ProductMysql;
