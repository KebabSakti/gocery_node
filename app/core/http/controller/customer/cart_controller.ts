import express, { Request, Response } from "express";
import CartItem from "../../../../feature/customer/ecommerce/entity/model/cart_item";
import CartValidatorJoi from "../../../../feature/customer/ecommerce/framework/joi/cart_validator_joi";
import CartMongodb from "../../../../feature/customer/ecommerce/framework/mongodb/cart_mongodb";
import ProductMongodb from "../../../../feature/customer/ecommerce/framework/mongodb/product_mongodb";
import CartUsecase from "../../../../feature/customer/ecommerce/usecase/cart_usecase";
import ErrorHandler from "../../../service/error_handler";

const router = express.Router();

const usecase: CartUsecase = new CartUsecase(
  new CartMongodb(),
  new ProductMongodb(),
  new CartValidatorJoi()
);

router.get("/", async (req: Request, res: Response) => {
  try {
    const customer = req.app.locals.user;

    const results = await usecase.show(customer);

    res.json(results);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { product_id, qty } = req.body;

    const user = req.app.locals.user;

    const cartItem: CartItem = {
      customer: user,
      product: product_id,
      qty: qty,
    };

    await usecase.store(cartItem);

    res.status(200).end();
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

router.delete("/", async (req: Request, res: Response) => {
  try {
    const user = req.app.locals.user;

    await usecase.remove(user);

    res.status(200).end();
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
