import PaginationOption from "../../../../core/model/pagination_option";
import CategoryModel from "../model/category_model";

abstract class CategoryRepository {
  abstract categories(
    paginationOption?: PaginationOption
  ): Promise<CategoryModel[]>;
}

export default CategoryRepository;
