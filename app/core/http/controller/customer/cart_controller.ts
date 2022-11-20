import { CartModel } from "./../../../../feature/customer/cart/model/cart_model";
import express, { Request, Response } from "express";
import ErrorHandler from "../../../service/error_handler";
import CartRepository from "../../../../feature/customer/cart/repository/cart_repository";
import CartMongo from "../../../../feature/customer/cart/datasource/cart_mongo";
import ProductRepository from "../../../../feature/customer/product/repository/product_repository";
import ProductMongo from "../../../../feature/customer/product/datasource/product_mongo";

const router = express.Router();
const cartRepository: CartRepository = new CartMongo();
const productRepository: ProductRepository = new ProductMongo();

router.get("/:customer_id/show", async (req: Request, res: Response) => {
  try {
    const results = await cartRepository.show(req.params.customer_id);

    res.json(results);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

router.post("/:customer_id", async (req: Request, res: Response) => {
  try {
    const product = await productRepository.show(req.body.product_id);
    const cart = await cartRepository.show(req.params.customer_id);

    if (product != null) {
      const totalQty: number = req.body.qty;
      const totalPrice: number = product.price?.final! * totalQty;

      let items: any;

      if (cart != undefined) {
        items = [
          ...cart.items.filter((e) => e.product != product._id),
          { product: product._id as string, qty: totalQty, total: totalPrice },
        ];
      } else {
        items = [
          { product: product._id as string, qty: totalQty, total: totalPrice },
        ];
      }

      const cartModel: CartModel = {
        customer: req.params.customer_id,
        qty: totalQty,
        total: totalPrice,
        items: items,
      };

      console.log(cartModel);

      await cartRepository.upsert(cartModel);
    }

    res.status(200).end();
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
