export interface IProduct {
  productID: number;
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
  documentId?: string;
  name: string;
  titleInput?: string;
  descriptionInput?: string;
  priceInput?: number;
  handleSubmit?: () => void;
  brandInput?: string;
  SKUInput?: string;
  stockInput?: number;
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
export interface Iuser {
  username?: string;
  email?: string;
  identifier?: string;
  password?: string;
  jwt?: string;
  data?: {
    identifier?: string;
    username: string;
    email: string;
    password: string;
  };
}
export interface IAuthState {
  user: Iuser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
export interface ISettingsState {
  title: string;
  description: string;
  cancleTXT: string;
  okTXT: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  deleteAction: () => void;
}
