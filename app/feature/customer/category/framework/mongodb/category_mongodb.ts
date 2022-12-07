import CategoryModel from "../../entity/category_model";
import CategoryOption from "../../entity/category_option";
import CategoryContract from "../../usecase/contract/category_contract";
import CategoryScheme from "./category_scheme";

class CategoryMongodb implements CategoryContract {
  async index(option?: CategoryOption | undefined): Promise<CategoryModel[]> {
    const query = CategoryScheme.find({ active: true })
      .select("-active -created_at -updated_at -__v")
      .sort({ name: "asc" });

    if (option != undefined) {
      //filter by name
      if (option.name != undefined) {
        query.where({
          name: { $regex: option.name, $options: "i" },
        });
      }

      //paginate result
      if (option.pagination != undefined) {
        query.skip(option.pagination.offset).limit(option.pagination.limit);
      }
    }

    const results: CategoryModel[] = await query.exec();

    return results;
  }
}

export default CategoryMongodb;
