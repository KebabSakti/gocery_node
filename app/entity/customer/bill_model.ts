interface BillModel {
  _id?: string;
  title: string;
  value: number;
  selected?: boolean;
  active?: boolean;
  subtitle?: string;
  description?: string;
  note?: string;
}

export default BillModel;
