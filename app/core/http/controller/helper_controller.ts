import express, { Request, Response } from "express";
import { QueryOptions } from "mysql";
import Database from "../../service/mysql_database";
import { faker } from "@faker-js/faker";
import ErrorHandler from "../../service/error_handler";
import HelperService from "../../service/helper_service";
import ProductRepository from "../../../feature/customer/product/repository/product_repository";
import ProductMysql from "../../../feature/customer/product/datasource/product_mysql";
import ProductModel from "../../../feature/customer/product/model/product_model";
import ProductOption from "../../../feature/customer/product/model/product_option";
import PaginationOption from "../../model/pagination_option";

const router = express.Router();
const productRepository: ProductRepository = new ProductMysql();

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
          sql: `
                insert into product_statistics set
                uid = ?,
                product_uid = ?,
                sold = ?,
                view = ?,
                favourite = ?,
                created_at = ?,
                updated_at = ?
                `,
          values: [
            faker.datatype.uuid(),
            params.product_uid,
            faker.random.numeric(),
            faker.random.numeric(),
            faker.random.numeric(),
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
    // const iterates: number[] = [...Array(2000).keys()];

    // for (const _ in iterates) {
    //   const category = await row("categories");
    //   const product = await row("products");

    //   await insert({
    //     category_uid: category.uid,
    //     product_uid: product.uid,
    //   });
    // }

    // const items = await rows("orders");
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

    let productOption: ProductOption | undefined = undefined;

    let paginationOption: PaginationOption | undefined = undefined;

    const page: number | undefined =
      req.query.page == undefined
        ? undefined
        : parseInt(req.query.page as string);

    const bundle_uid: string | undefined =
      req.query.bundle_uid == undefined
        ? undefined
        : (req.query.bundle_uid as string);

    const search: string | undefined =
      req.query.search == undefined ? undefined : (req.query.search as string);

    const category_uid: string | undefined =
      req.query.category_uid == undefined
        ? undefined
        : (req.query.category_uid as string);

    const cheapest: string | undefined =
      req.query.cheapest == undefined
        ? undefined
        : (req.query.cheapest as string);

    const discount: string | undefined =
      req.query.discount == undefined
        ? undefined
        : (req.query.discount as string);

    const point: string | undefined =
      req.query.point == undefined ? undefined : (req.query.point as string);

    const sold: string | undefined =
      req.query.sold == undefined ? undefined : (req.query.sold as string);

    const view: string | undefined =
      req.query.view == undefined ? undefined : (req.query.view as string);

    const favourite: string | undefined =
      req.query.favourite == undefined
        ? undefined
        : (req.query.favourite as string);

    productOption = {
      bundle_uid: bundle_uid,
      search: search,
      category_uid: category_uid,
      cheapest: cheapest,
      discount: discount,
      point: point,
      sold: sold,
      view: view,
      favourite: favourite,
    };

    if (page != undefined) {
      paginationOption = {
        perPage: 5,
        currentPage: page,
      };
    }

    const p: ProductModel[] = await productRepository.products(
      productOption,
      paginationOption
    );

    const { sorting } = req.query;

    res.json(p);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
