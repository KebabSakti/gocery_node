class CategoryModel {
  id?: number;
  uid?: string;
  name?: string;
  image?: string;

  constructor(id?: number, uid?: string, name?: string, image?: string) {
    this.id = id;
    this.uid = uid;
    this.name = name;
    this.image = image;
  }
}

export default CategoryModel;
