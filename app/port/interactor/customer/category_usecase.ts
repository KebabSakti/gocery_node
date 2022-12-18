import CategoryModel from "../../../entity/customer/category_model";
import CategoryOption from "../../../entity/customer/category_option";
import CategoryContract from "../../repository/customer/category_contract";

class CategoryUsecase {
  private repository: CategoryContract;

  constructor(repository: CategoryContract) {
    this.repository = repository;
  }

  async index(option?: CategoryOption): Promise<CategoryModel[]> {
    return await this.repository.index(option);
  }
}

export default CategoryUsecase;
