import PaginationModel from "../../../../core/model/pagination_option";
import CategoryModel from "../model/category_model";
import CategoryOption from "../model/category_option";

abstract class CategoryRepository {
  abstract category(uid: string): Promise<CategoryModel | null>;

  abstract categories(
    paginationOption?: PaginationModel,
    categoryOption?: CategoryOption
  ): Promise<CategoryModel[] | []>;
}

export default CategoryRepository;
