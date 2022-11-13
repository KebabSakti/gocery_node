import PaginationOption from "../../../../core/model/pagination_option";
import {
  ProductModel,
  ProductViewModel,
  ProductFavouriteModel,
  ProductOption,
} from "../model/product_model";
import {
  ProductFavouriteRepository,
  ProductRepository,
  ProductViewRepository,
} from "../repository/product_repository";
import Database from "../../../../core/service/mysql_database";
import { QueryOptions } from "mysql";
import QueryBuilder from "../../../../core/service/query_builder";
import HelperService from "../../../../core/service/helper_service";

export class ProductMysql implements ProductRepository {
  async index(
    productOption?: ProductOption | undefined,
    paginationOption?: PaginationOption | undefined
  ): Promise<ProductModel[]> {
    const result = new Promise<ProductModel[]>((resolve, reject) => {
      Database.pool
        .then((connection) => {
          const queryBuilder: QueryBuilder = new QueryBuilder({
            table: "products p",
          });

          queryBuilder.fields = [
            "p.*",
            "c.category_uid",
            "t.sold",
            "t.view",
            "t.favourite",
            "m.name as unit_name",
            "u.count as unit_count",
            "s.fixed as discount_type",
            "s.amount as discount_amount",
          ];

          queryBuilder.joins = [
            "join product_statistics t on t.product_uid = p.uid",
            "join product_categories c on c.product_uid = p.uid",
            "join product_units u on u.product_uid = p.uid",
            "join unit_measures m on u.unit_measure_uid = m.uid",
            "left join product_discounts d on d.product_uid = p.uid",
            "left join discounts s on d.discount_uid = s.uid",
          ];

          queryBuilder.wheres = ["p.active = 1"];

          if (productOption != undefined) {
            //FILTER
            if (productOption.bundle_uid != undefined) {
              queryBuilder.wheres = [
                `p.uid in (select product_uid from bundle_products where bundle_uid = ${connection.escape(
                  productOption.bundle_uid
                )})`,
              ];
            }

            if (productOption.search != undefined) {
              queryBuilder.wheres = [
                `p.name like "%"${connection.escape(productOption.search)}"%"`,
              ];
            }

            if (productOption.category_uid != undefined) {
              queryBuilder.wheres = [
                `c.category_uid = ${connection.escape(
                  productOption.category_uid
                )}`,
              ];
            }

            //SORT
            if (productOption.cheapest != undefined) {
              queryBuilder.sorts = ["p.price asc"];
            }

            if (productOption.discount != undefined) {
              queryBuilder.sorts = ["discount_amount desc"];
            }

            if (productOption.point != undefined) {
              queryBuilder.sorts = ["p.point desc"];
            }

            if (productOption.sold != undefined) {
              queryBuilder.sorts = ["t.sold desc"];
            }

            if (productOption.view != undefined) {
              queryBuilder.sorts = ["t.view desc"];
            }

            if (productOption.favourite != undefined) {
              queryBuilder.sorts = ["t.favourite desc"];
            }
          }

          if (paginationOption != undefined) {
            queryBuilder.pagings = paginationOption;
          }

          const query: QueryOptions = {
            sql: queryBuilder.query,
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

  async show(uid: string): Promise<ProductModel | null> {
    const result = new Promise<ProductModel | null>((resolve, reject) => {
      Database.pool
        .then((connection) => {
          const query: QueryOptions = {
            sql: `select
                  p.*,
                  c.category_uid,
                  t.sold,
                  t.view,
                  t.favourite,
                  m.name as unit_name,
                  u.count as unit_count,
                  s.fixed as discount_type,
                  s.amount as discount_amount
                  from products p
                  join product_statistics t on t.product_uid = p.uid
                  join product_categories c on c.product_uid = p.uid
                  join product_units u on u.product_uid = p.uid
                  join unit_measures m on u.unit_measure_uid = m.uid
                  left join product_discounts d on d.product_uid = p.uid
                  left join discounts s on d.discount_uid = s.uid
                  where p.active = 1`,
            values: [uid],
          };

          connection.query(query, (error, results) => {
            let product: ProductModel | null = null;

            if (error) {
              return reject(error);
            }

            if (results.length > 0) {
              const e: ProductModel = results[0];

              product = {
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
            }

            resolve(product);
          });
        })
        .catch((error) => {
          reject(error);
        });
    });

    return result;
  }
}

export class ProductViewMysql implements ProductViewRepository {
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
              productViewModel.uid,
              productViewModel.customer_uid,
              productViewModel.product_uid,
              productViewModel.created_at,
              productViewModel.updated_at,
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

export class ProductFavouriteMysql implements ProductFavouriteRepository {
  async index(
    customer_uid: string,
    paginationOption?: PaginationOption | undefined
  ): Promise<ProductModel[]> {
    const result: Promise<ProductModel[]> = new Promise<ProductModel[]>(
      (resolve, reject) => {
        Database.pool
          .then((connection) => {
            const queryBuilder: QueryBuilder = new QueryBuilder({
              table: "product_favourites f",
            });

            queryBuilder.fields = ["p.*"];

            queryBuilder.joins = [`join products p on f.product_uid = p.uid`];

            queryBuilder.wheres = [
              `f.customer_uid = ${connection.escape(customer_uid)}`,
            ];

            queryBuilder.sorts = ["f.created_at desc"];

            if (paginationOption != undefined) {
              queryBuilder.pagings = paginationOption;
            }

            const query: QueryOptions = {
              sql: queryBuilder.query,
            };

            connection.query(query, (error, results) => {
              let views: ProductModel[] = [];

              if (error) {
                return reject(error);
              }

              if (results.length > 0) {
                views = Array.from(results, (e: ProductModel) => {
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

  async store(productFavouriteModel: ProductFavouriteModel): Promise<void> {
    const result: Promise<void> = new Promise<void>((resolve, reject) => {
      Database.pool
        .then((connection) => {
          const queryBuilder: string = `insert into product_favourites set
                                        uid = ?,
                                        customer_uid = ?
                                        product_uid = ?
                                        created_at = ?
                                        updated_at = ?`;

          const query: QueryOptions = {
            sql: queryBuilder,
            values: [
              productFavouriteModel.uid,
              productFavouriteModel.customer_uid,
              productFavouriteModel.product_uid,
              productFavouriteModel.created_at,
              productFavouriteModel.updated_at,
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

  async remove(productFavouriteModel: ProductFavouriteModel): Promise<void> {
    const result: Promise<void> = new Promise<void>((resolve, reject) => {
      Database.pool
        .then((connection) => {
          const queryBuilder: string = `delete 
                                        from product_favourites
                                        where customer_uid = ?
                                        and product_uid = ?`;

          const query: QueryOptions = {
            sql: queryBuilder,
            values: [
              productFavouriteModel.customer_uid,
              productFavouriteModel.product_uid,
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
