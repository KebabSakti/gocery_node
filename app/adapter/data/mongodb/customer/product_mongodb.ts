import mongoose from "mongoose";
import ProductModel from "../../../../entity/customer/product_model";
import ProductOption from "../../../../entity/customer/product_option";
import ProductContract from "../../../../port/repository/customer/product_contract";
import BundleScheme from "./bundle_scheme";
import ProductScheme from "./product_scheme";

class ProductMongodb implements ProductContract {
  async getAllProduct(
    option?: ProductOption | undefined
  ): Promise<ProductModel[]> {
    const query = ProductScheme.find({ active: true }).select(
      "-active -created_at -updated_at -__v"
    );

    if (option != undefined) {
      if (option.bundle != undefined) {
        if (mongoose.isValidObjectId(option.bundle)) {
          const bundle = await BundleScheme.findOne({
            _id: option.bundle,
            active: true,
          }).select("products");

          if (bundle != null) {
            query.where("_id").in(bundle.products!);
          }
        }
      }

      if (option.search != undefined) {
        query.where({
          name: { $regex: option.search, $options: "i" },
        });
      }

      if (option.category != undefined) {
        query.where({
          category: option.category,
        });
      }

      if (option.cheapest != undefined) {
        query.sort({ "price.final": "asc" });
      }

      if (option.discount != undefined) {
        query.sort({ "price.discount": "desc" });
      }

      if (option.point != undefined) {
        query.sort({ point: "desc" });
      }

      if (option.sold != undefined) {
        query.sort({ "meta.sold": "desc" });
      }

      if (option.view != undefined) {
        query.sort({ "meta.view": "desc" });
      }

      if (option.favs != undefined) {
        query.sort({ "meta.favs": "desc" });
      }

      if (option.pagination != undefined) {
        query.skip(option.pagination.offset).limit(option.pagination.limit);
      }
    }

    const results = await query.exec();

    return results;
  }

  async getProductById(_id: string): Promise<ProductModel | null> {
    let results: ProductModel | null = null;

    if (mongoose.isValidObjectId(_id)) {
      results = await ProductScheme.findOne({
        _id: _id,
        active: true,
      }).select("-active -created_at -updated_at -__v");
    }

    return results;
  }
}

export default ProductMongodb;
