import { BadRequest } from "./../../../config/errors";
import express, { Request, Response } from "express";
import CartMongo from "../../../../feature/customer/cart/datasource/cart_mongo";
import CartRepository from "../../../../feature/customer/cart/repository/cart_repository";
import ProductMongo from "../../../../feature/customer/product/datasource/product_mongo";
import ProductRepository from "../../../../feature/customer/product/repository/product_repository";
import ErrorHandler from "../../../service/error_handler";
import { CartModel } from "./../../../../feature/customer/cart/model/cart_model";

const router = express.Router();
const cartRepository: CartRepository = new CartMongo();
const productRepository: ProductRepository = new ProductMongo();

router.get("/", async (req: Request, res: Response) => {
  try {
    const results = await cartRepository.show(req.app.locals.user);

    res.json(results);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    if (isNaN(req.body.qty)) {
      throw new BadRequest();
    }

    const product = await productRepository.show(req.body.product_id);
    const cart = await cartRepository.show(req.app.locals.user);

    if (product != null) {
      const totalQty: number = req.body.qty;
      const totalPrice: number = product.price?.final! * totalQty;

      let items = [];

      const item = {
        product: product._id as string,
        qty: totalQty,
        total: totalPrice,
      };

      if (cart != null) {
        items = [
          ...cart.items!.filter(
            (e) => (e.product as any)._id.toString() != product._id
          ),
          item,
        ];
      } else {
        items = [item];
      }

      items = items.filter((e) => e.qty > 0);

      let grandTotalQty = 0;
      let grandTotalPrice = 0;

      items.forEach((e) => {
        grandTotalQty += e.qty;
        grandTotalPrice += e.total;
      });

      const cartModel: CartModel = {
        customer: req.app.locals.user,
        qty: grandTotalQty,
        total: grandTotalPrice,
        items: items,
      };

      if (items.length == 0) {
        await cartRepository.remove(req.app.locals.user);
      } else {
        await cartRepository.upsert(cartModel);
      }
    }

    res.status(200).end();
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

router.delete("/", async (req: Request, res: Response) => {
  try {
    await cartRepository.remove(req.app.locals.user);

    res.status(200).end();
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
