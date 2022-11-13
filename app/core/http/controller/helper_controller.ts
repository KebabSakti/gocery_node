import express, { Request, Response } from "express";
import { QueryOptions } from "mysql";
import Database from "../../service/mysql_database";
import { faker } from "@faker-js/faker";
import ErrorHandler from "../../service/error_handler";
import HelperService from "../../service/helper_service";
import QueryBuilder from "../../service/query_builder";

const router = express.Router();

async function debug(): Promise<any> {
  const result = new Promise<any>((resolve, reject) => {
    Database.pool
      .then((connection) => {
        const query: QueryOptions = {
          sql: `select p.name, sum(o.qty) as sold from products p
                join order_products o on o.product_uid = p.uid
                where p.uid in (select product_uid from order_products
                              join orders on order_products.order_uid = orders.uid
                              join order_statuses on order_statuses.order_uid = orders.uid
                              where order_statuses.status = "completed")
                group by p.uid
                order by sold desc`,
        };

        connection.query(query, (error, results) => {
          if (error) {
            return reject(error);
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

async function rows(table: string): Promise<any> {
  const result = new Promise<any>((resolve, reject) => {
    Database.pool
      .then((connection) => {
        const query: QueryOptions = {
          sql: `select * from ${table}`,
        };

        connection.query(query, (error, results) => {
          if (error) {
            return reject(error);
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

async function row(table: string): Promise<any> {
  const result = new Promise<any>((resolve, reject) => {
    Database.pool
      .then((connection) => {
        const query: QueryOptions = {
          sql: `select * from ${table} order by RAND() limit 1`,
        };

        connection.query(query, (error, results) => {
          if (error) {
            return reject(error);
          }

          resolve(results[0]);
        });
      })
      .catch((error) => {
        reject(error);
      });
  });

  return result;
}

async function insert(params?: any): Promise<void> {
  return new Promise<void>((resolve, reject) => {
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
            faker.datatype.uuid(),
            params.customer_uid,
            faker.commerce.price(10000),
            HelperService.sqlDateNow(),
            HelperService.sqlDateNow(),
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
}

router.get("*", async (req: Request, res: Response) => {
  try {
    const iterates: number[] = [...Array(200).keys()];

    for (const _ in iterates) {
      const c = await row("customers");
      const p = await row("products");

      await insert({ customer_uid: c.uid, product_uid: p.uid });
    }

    // const items = await rows("products");
    // const statuses = ["pending", "progress", "completed", "canceled"];

    // for (const item of items as any[]) {
    //   const index = Math.floor(Math.random() * statuses.length);

    //   await insert({
    //     order_uid: item.uid,
    //     status: statuses[index],
    //   });
    // }

    // const d = await debug();

    // if (productOption.sold != undefined) {
    //   fields = [...fields, "sum(o.qty) as sold"];

    //   joins = [
    //     ...joins,
    //     "join order_products o on o.product_uid = p.uid",
    //   ];

    //   wheres = [
    //     ...wheres,
    //     `and p.uid in (select product_uid from order_products
    //     join orders on order_products.order_uid = orders.uid
    //     join order_statuses on order_statuses.order_uid = orders.uid
    //     where order_statuses.status = "completed")`,
    //   ];

    //   group = "group by p.uid";

    //   orders = [...orders, "sold desc"];
    // }

    // const datas = await rows("bundles");

    // for (const data of datas) {
    //   const i: number = parseInt(faker.random.numeric());

    //   for (let s = 0; s <= i; s++) {
    //     const e = await row("products");

    //     await insert({
    //       bundle_uid: data.uid,
    //       product_uid: e.uid,
    //     });
    //   }
    // }

    res.json("SUCCESS");
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
