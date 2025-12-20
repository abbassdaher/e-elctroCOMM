export interface IProduct {
            id: number;
            brand: string;
            images: string[];
            price: number; 
            quantity: number;
                    
}
export interface ICartItem {
           cart: IProduct[];
            quantity: number;
            
}