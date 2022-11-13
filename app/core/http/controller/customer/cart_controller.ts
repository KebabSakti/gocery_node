import express, { Request, Response } from "express";
import ErrorHandler from "../../../service/error_handler";
import {
  CartModel,
  CartItemModel,
  CartWithItemModel,
} from "../../../../feature/customer/cart/model/cart_model";
import {
  CartRepository,
  CartItemRepository,
} from "../../../../feature/customer/cart/repository/cart_repository";
import {
  CartMysql,
  CartItemMysql,
} from "../../../../feature/customer/cart/datasource/cart_mysql";
import { InternalServerError, ResourceNotFound } from "../../../config/errors";
import HelperService from "../../../service/helper_service";
import { ProductModel } from "../../../../feature/customer/product/model/product_model";
import { ProductRepository } from "../../../../feature/customer/product/repository/product_repository";
import { ProductMysql } from "../../../../feature/customer/product/datasource/product_mysql";

const router = express.Router();
const cartRepository: CartRepository = new CartMysql();
const cartItemRepository: CartItemRepository = new CartItemMysql();
const productRepository: ProductRepository = new ProductMysql();

router.get("/:customer_uid/show", async (req: Request, res: Response) => {
  try {
    const cart: CartModel | null = await cartRepository.show(
      req.params.customer_uid
    );

    if (cart == null) {
      throw new ResourceNotFound("Resource not found");
    }

    const cartItems: CartItemModel[] = await cartItemRepository.index(
      cart.uid!
    );

    const cartWithItems: CartWithItemModel = {
      cart: cart,
      cart_items: cartItems,
    };

    res.json(cartWithItems);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

router.post("/:customer_uid", async (req: Request, res: Response) => {
  try {
    const uid: string = HelperService.uuid();

    let cartTotal: number = 0;

    const cartItems: CartItemModel[] = req.body;

    for (const item of cartItems) {
      const product: ProductModel | null = await productRepository.show(
        item.product_uid!
      );

      if (product == null) {
        throw new InternalServerError("Something has broken internally");
      }

      const itemTotal: number = product.price! * item.qty!;

      cartTotal += itemTotal;

      await cartItemRepository.store({
        uid: HelperService.uuid(),
        cart_uid: uid,
        product_uid: item.product_uid,
        qty: item.qty,
        total: itemTotal,
        created_at: HelperService.sqlDateNow(),
        updated_at: HelperService.sqlDateNow(),
      });
    }

    await cartRepository.store({
      uid: uid,
      customer_uid: req.params.customer_uid,
      total: cartTotal,
      created_at: HelperService.sqlDateNow(),
      updated_at: HelperService.sqlDateNow(),
    });

    res.status(200).end();
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

router.put("/:customer_uid", async (req: Request, res: Response) => {
  try {
    const cartModel: CartModel | null = await cartRepository.show(
      req.params.customer_uid
    );

    if (cartModel == null) {
      throw new InternalServerError("Something has broken internally");
    }

    const uid: string = cartModel.uid!;

    let cartTotal: number = cartModel.total!;

    const cartItems: CartItemModel[] = req.body;

    for (const item of cartItems) {
      const product: ProductModel | null = await productRepository.show(
        item.product_uid!
      );

      if (product == null) {
        throw new InternalServerError("Something has broken internally");
      }

      const itemTotal: number = product.price! * item.qty!;

      cartTotal += itemTotal;

      await cartItemRepository.store({
        uid: HelperService.uuid(),
        cart_uid: uid,
        product_uid: item.product_uid,
        qty: item.qty,
        total: itemTotal,
        created_at: HelperService.sqlDateNow(),
        updated_at: HelperService.sqlDateNow(),
      });
    }

    await cartRepository.update({
      total: cartTotal,
      updated_at: HelperService.sqlDateNow(),
    });

    res.status(200).end();
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

router.delete("/:customer_uid", async (req: Request, res: Response) => {
  try {
    await cartRepository.remove(req.params.customer_uid);

    res.status(200).end();
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
