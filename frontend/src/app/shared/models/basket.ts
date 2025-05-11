import {v4 as uuid} from 'uuid';


export interface IBasket {
  id: string
  items: IBasketItem[]
  clientSecret?: string;
  paymentIntentId?: string;
  deliveryMethodId?: number;
  shippingPrice: number;
}

export interface IBasketItem {
  id: number
  name: string
  price: number
  quantity: number
  pictureUrl: string
  brand: string
  type: string
}
export class Basket implements IBasket{
  id = uuid();
  items: IBasketItem[] = [];
  shippingPrice = 0;
}
export interface IBasketTotals{
  shipping: number;
  subtotal: number;
  total: number;
}
