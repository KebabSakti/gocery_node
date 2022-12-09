import ProductScheme from "./product_scheme";
import mongoose from "mongoose";
import ProductMetaContract from "../../entity/contract/product_meta_contract";

class ProductMetaMongodb implements ProductMetaContract {
  async incrementProductView(product_id: string): Promise<void> {
    if (mongoose.isValidObjectId(product_id)) {
      await ProductScheme.updateOne(
        { _id: product_id },
        { updated_at: Date.now().toString(), $inc: { "meta.view": 1 } }
      );
    }
  }

  async incrementProductSold(product_id: string): Promise<void> {
    if (mongoose.isValidObjectId(product_id)) {
      await ProductScheme.updateOne(
        { _id: product_id },
        { updated_at: Date.now().toString(), $inc: { "meta.sold": 1 } }
      );
    }
  }

  async incrementProductFavs(product_id: string): Promise<void> {
    if (mongoose.isValidObjectId(product_id)) {
      await ProductScheme.updateOne(
        { _id: product_id },
        { updated_at: Date.now().toString(), $inc: { "meta.favs": 1 } }
      );
    }
  }
}

export default ProductMetaMongodb;
