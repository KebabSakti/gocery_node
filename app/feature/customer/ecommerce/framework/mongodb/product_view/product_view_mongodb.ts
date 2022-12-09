import mongoose from "mongoose";
import ProductViewModel from "../../../entity/product_view/product_view_model";
import ProductViewOption from "../../../entity/product_view/product_view_option";
import ProductViewContract from "../../../usecase/contract/product_view_contract";
import ProductViewScheme from "./product_view_scheme";

class ProductViewMongodb implements ProductViewContract {
  async index(
    customer_id: string,
    option?: ProductViewOption | undefined
  ): Promise<ProductViewModel[]> {
    const query = ProductViewScheme.find({ customer: customer_id })
      .sort({ updated_at: "desc" })
      .populate("product", "-active -created_at -updated_at -__v")
      .select("-active -created_at -updated_at -__v");

    if (option != undefined) {
      if (option.pagination != undefined) {
        query.skip(option.pagination.offset).limit(option.pagination.limit);
      }
    }

    const results = await query.exec();

    return results;
  }

  async store(productViewModel: ProductViewModel): Promise<void> {
    if (mongoose.isValidObjectId(productViewModel.product)) {
      await ProductViewScheme.updateOne(
        {
          customer: productViewModel.customer,
          product: productViewModel.product,
        },
        { ...productViewModel, $inc: { hit: 1 } },
        { upsert: true }
      );
    }
  }
}

export default ProductViewMongodb;
