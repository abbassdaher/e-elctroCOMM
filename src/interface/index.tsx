export interface IProduct {
  id: number;
  title: string;
  description: string;
  tags?: string[];
  brand: string;
  images: string[];
  price: number;
  quantity: number;
  rating: number;
  linkColor?: string;
  availabilityStatus: string;
  reviews?: {
    reviewerName: string;
    comment: string;
    rating: number;
    
  }[];
}
export interface ICartItem {
  cart: {
    cartItems: IProduct[];
  };
  quantity: number;
}

export interface IProductsState {
  data: { products: IProduct[] };
  loading: boolean;
  error: string | null;
}
export interface Iuser{
  username?: string;
  email?: string;
  identifier?: string;
  password?: string;
  data?:{
    identifier?: string;
    username: string;
    email: string;
    password: string;
  }
}
