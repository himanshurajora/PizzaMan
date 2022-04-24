export interface IOrderData{
    size: IPizzaSize;
    ingredients: IPizzaIngredient[];
  }

export declare interface ISelectProps{
    orderData: IOrderData;
    setOrderData: (orderData: IOrderData) => void;
}

export declare interface ISelectIngredientsProps{
    orderData: IOrderData;
    setOrderData: (orderData: IOrderData) => void;
    handleAddToCart: () => void;
}

export declare interface INavbarProps{
    cartItems: IOrderData[]
}

export declare interface ICartProps{
    cartItems: IOrderData[];
    setCartItems: (cartItems: IOrderData[]) => void;

}

export declare interface IPizzaSize{
    id: number;
    name: string;
    price: number;
}

export declare interface IPizzaIngredient{
    id: number;
    name: string;
    price: number;
}