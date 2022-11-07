import CategoryModel from "../model/category_model";
import CategoryRepository from "../repository/category_repository";
import Database from "../../../../core/service/mysql_database";
import { QueryOptions } from "mysql";
import HelperService from "../../../../core/service/helper_service";
import PaginationOption from "../../../../core/model/pagination_option";

class CategoryMysql implements CategoryRepository {
  async categories(
    paginationOption?: PaginationOption
  ): Promise<CategoryModel[]> {
    const result: Promise<CategoryModel[]> = new Promise<CategoryModel[]>(
      (resolve, reject) => {
        Database.pool
          .then((connection) => {
            const queryBuilder: string =
              "select * from categories where active = 1";

            const query: QueryOptions = {
              sql:
                paginationOption == undefined
                  ? queryBuilder
                  : HelperService.paginate(queryBuilder, paginationOption),
            };

            connection.query(query, (error, results) => {
              let categories: CategoryModel[] = [];

              if (error) {
                return reject(error);
              }

              if (results.length > 0) {
                categories = Array.from(results, (e: CategoryModel) => {
                  return {
                    uid: e.uid,
                    name: e.name,
                    image: e.image,
                  };
                });
              }

              resolve(categories);
            });
          })
          .catch((error) => {
            reject(error);
          });
      }
    );

    return result;
  }
}

export default CategoryMysql;
