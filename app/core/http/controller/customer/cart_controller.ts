// import express, { Request, Response } from "express";
// import ErrorHandler from "../../../service/error_handler";
// import {
//   CartModel,
//   CartItemModel,
//   CartWithItemModel,
// } from "../../../../feature/customer/cart/model/cart_model";
// import {
//   CartRepository,
//   CartItemRepository,
// } from "../../../../feature/customer/cart/repository/cart_repository";
// import {
//   CartMysql,
//   CartItemMysql,
// } from "../../../../feature/customer/cart/datasource/cart_mysql";
// import HelperService from "../../../service/helper_service";
// import { ProductModel } from "../../../../feature/customer/product/model/product_model";
// import { ProductRepository } from "../../../../feature/customer/product/repository/product_repository";
// import { ProductMysql } from "../../../../feature/customer/product/datasource/product_mysql";

// const router = express.Router();
// const cartRepository: CartRepository = new CartMysql();

// router.get("/:customer_uid/show", async (req: Request, res: Response) => {
//   try {
//     const cart: CartModel | null = await cartRepository.show(
//       req.params.customer_uid
//     );

//     if (cart != null) {
//       const cartItems: CartItemModel[] = await cartItemRepository.index(
//         cart.uid!
//       );

//       const cartWithItems: CartWithItemModel = {
//         cart: cart,
//         cart_items: cartItems,
//       };

//       res.json(cartWithItems);
//     }

//     res.status(200).end();
//   } catch (error) {
//     new ErrorHandler(res, error);
//   }
// });

// router.post("/:customer_uid", async (req: Request, res: Response) => {
//   try {
//     const cart: CartModel | null = await cartRepository.show(
//       req.params.customer_uid
//     );

//     if (cart != null) {
//       const cartItem: CartItemModel[] = await cartItemRepository.index(
//         cart.uid!
//       );

//       for (const item of cartItem) {
//         await cartItemRepository.remove(item.uid!);
//       }

//       await cartRepository.remove(req.params.customer_uid);
//     }

//     const cartUid: string = HelperService.uuid();
//     let cartPayTotal: number = 0;

//     const itemPayloads: CartItemModel[] = req.body;

//     for (const itemPayload of itemPayloads) {
//       const productModel: ProductModel | null = await productRepository.show(
//         itemPayload.product_uid!
//       );

//       if (productModel != null) {
//         cartPayTotal += productModel.final_price! * itemPayload.qty!;

//         await cartItemRepository.store({
//           uid: HelperService.uuid(),
//           cart_uid: cartUid,
//           product_uid: productModel.uid,
//           qty: itemPayload.qty,
//           total: productModel.final_price! * itemPayload.qty!,
//         });
//       }
//     }

//     await cartRepository.store({
//       uid: cartUid,
//       customer_uid: req.params.customer_uid,
//       total: cartPayTotal,
//       created_at: HelperService.sqlDateNow(),
//       updated_at: HelperService.sqlDateNow(),
//     });

//     res.status(200).end();
//   } catch (error) {
//     new ErrorHandler(res, error);
//   }
// });

// router.delete("/:customer_uid", async (req: Request, res: Response) => {
//   try {
//     const cart: CartModel | null = await cartRepository.show(
//       req.params.customer_uid
//     );

//     if (cart != null) {
//       const cartItem: CartItemModel[] = await cartItemRepository.index(
//         cart.uid!
//       );

//       for (const item of cartItem) {
//         await cartItemRepository.remove(item.uid!);
//       }

//       await cartRepository.remove(req.params.customer_uid);
//     }

//     res.status(200).end();
//   } catch (error) {
//     new ErrorHandler(res, error);
//   }
// });

// export default router;
