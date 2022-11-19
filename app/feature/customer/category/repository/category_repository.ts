import PagingOption from "../../../../core/model/paging_option";
import { CategoryModel } from "../model/category_model";

abstract class CategoryRepository {
  abstract index(pagingOption?: PagingOption): Promise<CategoryModel[]>;
}

export default CategoryRepository;
