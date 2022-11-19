import PagingOption from "../../../../core/model/paging_option";
import { ViewModel } from "../model/view_model";

abstract class ViewRepository {
  abstract index(id: string, pagingOption?: PagingOption): Promise<ViewModel[]>;

  abstract upsert(viewModel: ViewModel): Promise<void>;
}

export default ViewRepository;
