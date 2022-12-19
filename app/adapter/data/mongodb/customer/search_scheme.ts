import { model, Schema } from "mongoose";
import SearchModel from "../../../../entity/customer/search_model";

const SearchScheme = model<SearchModel>(
  "searches",
  new Schema<SearchModel>({
    customer: { type: String, required: true },
    keyword: { type: String, required: true },
    created_at: { type: String, default: Date.now() },
    updated_at: { type: String, default: Date.now() },
  })
);

export default SearchScheme;