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
