import CategoryModel from "../../../../entity/customer/category_model";
import CategoryOption from "../../../../entity/customer/category_option";
import CategoryContract from "../../../../port/repository/customer/category_contract";
import CategoryScheme from "./category_scheme";

class CategoryMongodb implements CategoryContract {
  async index(option?: CategoryOption | undefined): Promise<CategoryModel[]> {
    const query = CategoryScheme.find({ active: true })
      .select("-active -created_at -updated_at -__v")
      .sort({ name: "asc" });

    if (option != undefined) {
      if (option.name != undefined) {
        query.where({
          name: { $regex: option.name, $options: "i" },
        });
      }

      if (option.pagination != undefined) {
        query.skip(option.pagination.offset).limit(option.pagination.limit);
      }
    }

    const results: CategoryModel[] = await query.exec();

    return results;
  }
}

export default CategoryMongodb;
