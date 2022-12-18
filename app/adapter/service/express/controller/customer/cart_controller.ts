import express, { Request, Response } from "express";
import ErrorHandler from "../../../../../common/error/error_handler";
import CartItem from "../../../../../entity/customer/cart_item";
import CartUsecase from "../../../../../port/interactor/customer/cart_usecase";
import CartMongodb from "../../../../data/mongodb/customer/cart_mongodb";
import ProductMongodb from "../../../../data/mongodb/customer/product_mongodb";

const router = express.Router();

const usecase: CartUsecase = new CartUsecase(
  new CartMongodb(),
  new ProductMongodb()
);

router.get("/", async (req: Request, res: Response) => {
  try {
    const customer = req.app.locals.user;

    const results = await usecase.getCartByCustomerId(customer);

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

    await usecase.updateCart(cartItem);

    res.status(200).end();
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

router.delete("/", async (req: Request, res: Response) => {
  try {
    const user = req.app.locals.user;

    await usecase.clearCart(user);

    res.status(200).end();
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
