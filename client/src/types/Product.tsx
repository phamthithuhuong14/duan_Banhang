export type Product = {
  _id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  category: Category;
  isShow: boolean;
  createdAt: Date; 
};

export type Category = {
  _id: string;
  name: string;
  description: string;
};

export type ProductForm = {
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  isShow: boolean;
};
export type ProductFormParams = {
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  isShow: boolean;
};
export type CartItem = {
  product: Product;
  quantity: number;
};
export type Cart = {
  _id: string;
  user: string;
  products: CartItem[];
};
