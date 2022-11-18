import PagingOption from "../../../../core/model/paging_option";
import { CategoryModel } from "../../../../core/model/category_structure";

abstract class CategoryRepository {
  abstract index(pagingOption?: PagingOption): Promise<CategoryModel[]>;
}

export default CategoryRepository;
