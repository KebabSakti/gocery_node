interface BillModel {
  _id?: string;
  title: string;
  value: number;
  selected?: boolean | null;
  active?: boolean | null;
  subtitle?: string;
  description?: string;
  note?: string;
}

export default BillModel;
