import CategoryModel from "../model/category_model";
import CategoryOption from "../model/category_option";

abstract class CategoryContract {
  abstract index(option?: CategoryOption | undefined): Promise<CategoryModel[]>;
}

export default CategoryContract;
