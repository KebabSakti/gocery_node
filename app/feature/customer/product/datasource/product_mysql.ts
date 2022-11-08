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
          let fields: string[] = [
            "p.*",
            "t.sold",
            "t.view",
            "t.favourite",
            "m.name as unit_name",
            "u.count as unit_count",
            "s.fixed as discount_type",
            "s.amount as discount_amount",
          ];

          let joins = [
            "join product_statistics t on t.product_uid = p.uid",
            "join product_units u on u.product_uid = p.uid",
            "join unit_measures m on u.unit_measure_uid = m.uid",
            "left join product_discounts d on d.product_uid = p.uid",
            "left join discounts s on d.discount_uid = s.uid",
          ];

          let wheres = ["where p.active = 1"];

          let group = ``;

          let orders: string[] = [];

          if (productOption != undefined) {
            //FILTER
            if (productOption.bundle_uid != undefined) {
              wheres = [
                ...wheres,
                `and p.uid in (select product_uid from bundle_products where bundle_uid = ${connection.escape(
                  productOption.bundle_uid
                )})`,
              ];
            }

            if (productOption.search != undefined) {
              wheres = [
                ...wheres,
                `and p.name like "%"${connection.escape(
                  productOption.search
                )}"%"`,
              ];
            }

            if (productOption.category_uid != undefined) {
              fields = [...fields, "c.category_uid"];

              joins = [
                ...joins,
                "join product_categories c on c.product_uid = p.uid",
              ];

              wheres = [
                ...wheres,
                `and c.category_uid = ${connection.escape(
                  productOption.category_uid
                )}`,
              ];
            }

            //SORT
            if (productOption.cheapest != undefined) {
              orders = [...orders, "p.price asc"];
            }

            if (productOption.discount != undefined) {
              orders = [...orders, "discount_amount desc"];
            }

            if (productOption.point != undefined) {
              orders = [...orders, "p.point desc"];
            }

            if (productOption.sold != undefined) {
              orders = [...orders, "t.sold desc"];
            }

            if (productOption.view != undefined) {
              orders = [...orders, "t.view desc"];
            }

            if (productOption.favourite != undefined) {
              orders = [...orders, "t.favourite desc"];
            }
          }

          const sort = orders.length == 0 ? "" : `order by ${orders.join(",")}`;

          const queryBuilder = `select 
                              ${fields.join(",")}
                              from products p
                              ${joins.join(" ")}
                              ${wheres.join(" ")}
                              ${group} 
                              ${sort}`;

          const query: QueryOptions = {
            sql:
              paginationOption == undefined
                ? queryBuilder
                : HelperService.paginate(queryBuilder, {
                    perPage: paginationOption.perPage,
                    currentPage: paginationOption.currentPage,
                  }),
          };

          console.group(query.sql);

          connection.query(query, (error, results) => {
            let products: ProductModel[] = [];

            if (error) {
              return reject(error);
            }

            if (results.length > 0) {
              products = Array.from(results, (e: ProductModel) => {
                return {
                  uid: e.uid,
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
                  sold: e.sold,
                  view: e.view,
                  favourite: e.favourite,
                };
              });
            }

            resolve(products);
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
