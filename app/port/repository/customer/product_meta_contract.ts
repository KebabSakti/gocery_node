abstract class ProductMetaContract {
  abstract incrementProductView(product_id: string): Promise<void>;

  abstract incrementProductSold(product_id: string): Promise<void>;

  abstract incrementProductFavs(product_id: string): Promise<void>;
}

export default ProductMetaContract;
