export type User = {
    _id: string;
    email: string;
    username: string;
  };

export type Adress = {
  _id: string;
  address: string;
  user: string;
  phone: string;
}