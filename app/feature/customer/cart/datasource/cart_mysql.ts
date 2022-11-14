import { QueryOptions } from "mysql";
import { CartItemModel, CartModel } from "../model/cart_model";
import {
  CartItemRepository,
  CartRepository,
} from "../repository/cart_repository";
import Database from "../../../../core/service/mysql_database";
import HelperService from "../../../../core/service/helper_service";
import QueryBuilder from "../../../../core/service/query_builder";

export class CartMysql implements CartRepository {
  async show(customer_uid: string): Promise<CartModel | null> {
    const result = new Promise<CartModel | null>((resolve, reject) => {
      Database.pool
        .then((connection) => {
          const query: QueryOptions = {
            sql: "select * from carts where customer_uid = ?",
            values: [customer_uid],
          };

          connection.query(query, (error, results) => {
            let cart: CartModel | null = null;

            if (error) {
              return reject(error);
            }

            if (results.length > 0) {
              const e: CartModel = results[0];

              cart = {
                uid: e.uid,
                customer_uid: e.customer_uid,
                total: e.total,
              };
            }

            resolve(cart);
          });
        })
        .catch((error) => {
          reject(error);
        });
    });

    return result;
  }

  async store(cartModel: CartModel): Promise<void> {
    const result: Promise<void> = new Promise<void>((resolve, reject) => {
      Database.pool
        .then((connection) => {
          const query: QueryOptions = {
            sql: `insert into carts set 
                  uid = ?,
                  customer_uid = ?,
                  total = ?,
                  created_at = ?,
                  updated_at = ?`,
            values: [
              cartModel.uid,
              cartModel.customer_uid,
              cartModel.total,
              cartModel.created_at,
              cartModel.updated_at,
            ],
          };

          connection.query(query, (error, results) => {
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

  async update(cartModel: CartModel): Promise<void> {
    const result: Promise<void> = new Promise<void>((resolve, reject) => {
      Database.pool
        .then((connection) => {
          const query: QueryOptions = {
            sql: `update carts set 
                  total = ?,
                  updated_at = ?
                  where customer_uid = ?`,
            values: [
              cartModel.total,
              cartModel.updated_at,
              cartModel.customer_uid,
            ],
          };

          connection.query(query, (error, results) => {
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

  async remove(customer_uid: string): Promise<void> {
    const result: Promise<void> = new Promise<void>((resolve, reject) => {
      Database.pool
        .then((connection) => {
          const query: QueryOptions = {
            sql: `delete from carts where customer_uid = ?`,
            values: [customer_uid],
          };

          connection.query(query, (error, results) => {
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

export class CartItemMysql implements CartItemRepository {
  async index(cart_uid: string): Promise<CartItemModel[]> {
    const result: Promise<CartItemModel[]> = new Promise<CartItemModel[]>(
      (resolve, reject) => {
        Database.pool
          .then((connection) => {
            const queryBuilder: QueryBuilder = new QueryBuilder({
              table: "cart_items i",
            });

            queryBuilder.fields = [
              "i.*",
              "c.category_uid",
              "p.name",
              "p.description",
              "p.image",
              "p.price",
              "p.point",
              "p.min",
              "p.max",
              "p.link",
              "p.final_price",
              "m.name as unit_name",
              "u.count as unit_count",
              "s.fixed as discount_type",
              "s.amount as discount_amount",
            ];

            queryBuilder.joins = [
              "join products p on i.product_uid = p.uid",
              "join product_categories c on c.product_uid = p.uid",
              "join product_units u on u.product_uid = p.uid",
              "join unit_measures m on u.unit_measure_uid = m.uid",
              "left join product_discounts d on d.product_uid = p.uid",
              "left join discounts s on d.discount_uid = s.uid",
            ];

            queryBuilder.wheres = [
              `i.cart_uid = ${connection.escape(cart_uid)}`,
            ];

            const query: QueryOptions = {
              sql: queryBuilder.query,
            };

            connection.query(query, (error, results) => {
              let cartItems: CartItemModel[] = [];

              if (error) {
                return reject(error);
              }

              if (results.length > 0) {
                cartItems = Array.from(results, (e: CartItemModel) => {
                  return {
                    uid: e.uid,
                    cart_uid: e.cart_uid,
                    product_uid: e.product_uid,
                    category_uid: e.category_uid,
                    name: e.name,
                    description: e.description,
                    image: e.image,
                    price: e.price,
                    final_price: e.final_price,
                    point: e.point,
                    min: e.min,
                    max: e.max,
                    link: e.link,
                    unit_name: e.unit_name,
                    unit_count: e.unit_count,
                    discount_type: e.discount_type,
                    discount_amount: e.discount_amount,
                    qty: e.qty,
                    total: e.total,
                  };
                });
              }

              resolve(cartItems);
            });
          })
          .catch((error) => {
            reject(error);
          });
      }
    );

    return result;
  }

  async show(cartItemModel: CartItemModel): Promise<CartItemModel | null> {
    const result = new Promise<CartItemModel | null>((resolve, reject) => {
      Database.pool
        .then((connection) => {
          const queryBuilder: QueryBuilder = new QueryBuilder({
            table: "cart_items i",
          });

          queryBuilder.fields = [
            "i.*",
            "c.category_uid",
            "p.name",
            "p.description",
            "p.image",
            "p.price",
            "p.point",
            "p.min",
            "p.max",
            "p.link",
            "m.name as unit_name",
            "u.count as unit_count",
            "s.fixed as discount_type",
            "s.amount as discount_amount",
          ];

          queryBuilder.joins = [
            "join products p on i.product_uid = p.uid",
            "join product_categories c on c.product_uid = p.uid",
            "join product_units u on u.product_uid = p.uid",
            "join unit_measures m on u.unit_measure_uid = m.uid",
            "left join product_discounts d on d.product_uid = p.uid",
            "left join discounts s on d.discount_uid = s.uid",
          ];

          queryBuilder.wheres = [
            `i.cart_uid = ${connection.escape(cartItemModel.cart_uid)}`,
            `i.product_uid = ${connection.escape(cartItemModel.product_uid)}`,
          ];

          const query: QueryOptions = {
            sql: queryBuilder.query,
          };

          connection.query(query, (error, results) => {
            let cartItem: CartItemModel | null = null;

            if (error) {
              return reject(error);
            }

            if (results.length > 0) {
              const e: CartItemModel = results[0];

              cartItem = {
                uid: e.uid,
                cart_uid: e.cart_uid,
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
                qty: e.qty,
                total: e.total,
              };
            }

            resolve(cartItem);
          });
        })
        .catch((error) => {
          reject(error);
        });
    });

    return result;
  }

  async store(cartItemModel: CartItemModel): Promise<void> {
    const result: Promise<void> = new Promise<void>((resolve, reject) => {
      Database.pool
        .then((connection) => {
          const query: QueryOptions = {
            sql: `insert into cart_items set 
                  uid = ?,
                  cart_uid = ?,
                  product_uid = ?,
                  qty = ?,
                  total = ?,
                  created_at = ?,
                  updated_at = ?`,
            values: [
              cartItemModel.uid,
              cartItemModel.cart_uid,
              cartItemModel.product_uid,
              cartItemModel.qty,
              cartItemModel.total,
              cartItemModel.created_at,
              cartItemModel.updated_at,
            ],
          };

          connection.query(query, (error, results) => {
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

  async update(cartItemModel: CartItemModel): Promise<void> {
    const result: Promise<void> = new Promise<void>((resolve, reject) => {
      Database.pool
        .then((connection) => {
          const query: QueryOptions = {
            sql: `update cart_items set 
                  qty = ?,
                  total = ?,
                  updated_at = ?
                  where uid = ?`,
            values: [
              cartItemModel.qty,
              cartItemModel.total,
              cartItemModel.updated_at,
              cartItemModel.uid,
            ],
          };

          connection.query(query, (error, results) => {
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
          const query: QueryOptions = {
            sql: `delete from cart_items where uid = ?`,
            values: [uid],
          };

          connection.query(query, (error, results) => {
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
