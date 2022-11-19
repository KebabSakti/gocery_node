import mongoose from "mongoose";
import { BundleScheme } from "./../../../../core/model/bundle_structure";
import PagingOption from "../../../../core/model/paging_option";
import {
  ProductModel,
  ProductScheme,
} from "../../../../core/model/product_structure";
import ProductIndexOption from "../model/product_index_option";
import ProductRepository from "../repository/product_repository";

class ProductMongo implements ProductRepository {
  async index(
    pagingOption: PagingOption,
    productIndexOption?: ProductIndexOption | undefined
  ): Promise<ProductModel[]> {
    const query = ProductScheme.find({ active: 1 }).select(
      "-active -created_at -updated_at -__v"
    );

    if (productIndexOption != undefined) {
      if (productIndexOption.bundle != undefined) {
        if (mongoose.isValidObjectId(productIndexOption.bundle)) {
          const bundle = await BundleScheme.findById(
            productIndexOption.bundle
          ).where({ active: 1 });

          if (bundle != null) {
            query.where("_id").in(bundle.products!);
          }
        }
      }

      if (productIndexOption.search != undefined) {
        query.where({
          name: { $regex: productIndexOption.search, $options: "i" },
        });
      }

      if (productIndexOption.category != undefined) {
        if (mongoose.isValidObjectId(productIndexOption.category)) {
          query.where({
            category: productIndexOption.category,
          });
        }
      }

      if (productIndexOption.cheapest != undefined) {
        query.sort({ "price.final": "asc" });
      }

      if (productIndexOption.discount != undefined) {
        query.sort({ "price.discount": "desc" });
      }

      if (productIndexOption.point != undefined) {
        query.sort({ point: "desc" });
      }

      if (productIndexOption.sold != undefined) {
        query.sort({ "meta.sold": "desc" });
      }

      if (productIndexOption.view != undefined) {
        query.sort({ "meta.view": "desc" });
      }

      if (productIndexOption.favs != undefined) {
        query.sort({ "meta.favs": "desc" });
      }
    }

    query.skip(pagingOption.offset).limit(pagingOption.limit);

    const results: ProductModel[] = await query.exec();

    return results;
  }

  async show(id: string): Promise<ProductModel | null> {
    let results: ProductModel | null = null;

    if (mongoose.isValidObjectId(id)) {
      results = await ProductScheme.findById(id);
    }

    return results;
  }

  async incrementView(id: string): Promise<void> {
    if (mongoose.isValidObjectId(id)) {
      await ProductScheme.findByIdAndUpdate(id, { $inc: { "meta.view": 1 } });
    }
  }
}

export default ProductMongo;
