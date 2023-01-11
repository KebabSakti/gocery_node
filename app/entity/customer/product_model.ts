interface ProductModel {
  _id?: string;
  category?: string;
  name?: string;
  description?: string;
  image?: string;
  point?: number;
  stock?: number;
  min?: number;
  max?: number;
  link?: string;
  active?: boolean;
  currency?: {
    code: string;
    name: string;
    symbol: string;
  };
  price?: {
    base: number;
    discount: number;
    final: number;
  };
  unit?: {
    name: string;
    symbol: string;
    count: number;
  };
  meta?: {
    sold: number;
    view: number;
    favs: number;
  };
  created_at?: string;
  updated_at?: string;
}

export default ProductModel;
