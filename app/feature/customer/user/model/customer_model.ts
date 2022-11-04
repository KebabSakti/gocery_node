class CustomerModel {
  id?: number;
  uid?: string;
  name?: string;
  email?: string;
  phone?: string;
  active?: number;

  constructor(
    id?: number,
    uid?: string,
    name?: string,
    email?: string,
    phone?: string,
    active?: number
  ) {
    this.id = id;
    this.uid = uid;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.active = active;
  }
}

export default CustomerModel;
