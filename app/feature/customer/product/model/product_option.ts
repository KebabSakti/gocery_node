interface ProductOption {
  bundle_uid?: string;
  sold?: string;
  search?: string;
  category_uid?: string;
  cheapest?: string;
  discount?: string;
  point?: string;
}

export default ProductOption;

//QUERY (switch) : bundle, penjualan terbanyak, pencarian
//FILTER (switch) : categori
//SORT (toggle) : harga termurah, diskon tertinggi, poin terbanyak
