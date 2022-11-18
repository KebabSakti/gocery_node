import PagingOption from "../../../../core/model/paging_option";
import CategoryRepository from "../repository/category_repository";
import {
  CategoryModel,
  CategoryScheme,
} from "../../../../core/model/category_structure";

class CategoryMongo implements CategoryRepository {
  async index(pagingOption?: PagingOption): Promise<CategoryModel[]> {
    const query = CategoryScheme.find({ active: 1 }).select(
      "-active -created_at -updated_at -__v"
    );

    if (pagingOption != undefined) {
      query.skip(pagingOption.offset).limit(pagingOption.limit);
    }

    const results: CategoryModel[] = await query.exec();

    return results;
  }
}

export default CategoryMongo;
