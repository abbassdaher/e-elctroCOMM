export interface IProduct {
  id: number;
  brand: string;
  images: string[];
  price: number;
  quantity: number;
}
export interface ICartItem {
  cart: {
    cartItems: IProduct[];
  };
  quantity: number;
}

export interface IProductsState {
  products: IProduct[];
  loading: boolean;
  error: string | null;
}
