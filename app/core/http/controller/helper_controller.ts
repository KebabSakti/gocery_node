import express, { Request, Response } from "express";
import { QueryOptions } from "mysql";
import Database from "../../service/mysql_database";
import { InternalServerError } from "../../config/errors";
import { faker } from "@faker-js/faker";
import ErrorHandler from "../../service/error_handler";
import HelperService from "../../service/helper_service";

const router = express.Router();

async function insert(index: number): Promise<void> {
  new Promise<void>((resolve, reject) => {
    Database.pool
      .then((connection) => {
        const query: QueryOptions = {
          sql: `
                insert into categories set
                uid = ?,
                name = ?,
                image = ?,
                number = ?,
                active = ?,
                created_at = ?,
                updated_at = ?
                `,
          values: [
            faker.datatype.uuid(),
            faker.random.word(),
            faker.image.food(),
            index,
            1,
            HelperService.sqlDateNow(),
            HelperService.sqlDateNow(),
          ],
        };

        connection.query(query, (error, results) => {
          if (error) {
            return reject(error);
          }

          if (results.affectedRows == 0) {
            return reject(new InternalServerError("Insert new data failed"));
          }

          resolve();
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

router.get("/seed", async (req: Request, res: Response) => {
  try {
    [...Array(10).keys()].forEach(async (e, i) => {
      await insert(i);
    });

    res.json("SUCCESS");
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
