import CategoryModel from "../../entity/category_model";
import CategoryOption from "../../entity/category_option";

abstract class CategoryContract {
  abstract index(option?: CategoryOption | undefined): Promise<CategoryModel[]>;
}

export default CategoryContract;
