import CategoryModel from "../model/category_model";

abstract class CategoryRepository {
  abstract category(uid: string): Promise<CategoryModel | null>;

  abstract categories(): Promise<CategoryModel[] | []>;
}

export default CategoryRepository;
