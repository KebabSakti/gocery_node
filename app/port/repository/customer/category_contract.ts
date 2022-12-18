import CategoryModel from "../../../entity/customer/category_model";
import CategoryOption from "../../../entity/customer/category_option";

abstract class CategoryContract {
  abstract index(option?: CategoryOption | undefined): Promise<CategoryModel[]>;
}

export default CategoryContract;
