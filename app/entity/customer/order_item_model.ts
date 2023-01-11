interface OrderItemModel {
  _id?: string;
  order?: string;
  product?: string;
  category?: string;
  name?: string;
  description?: string;
  image?: string;
  point?: number;
  stock?: number;
  min?: number;
  max?: number;
  link?: string;
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
  note?: string;
  qty?: number;
  total?: number;
}

export default OrderItemModel;
