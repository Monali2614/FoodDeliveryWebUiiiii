import { Menu } from "./menu";

export interface OrderItem {
itemTotalPrice: any;
  id: number;
  menuId: number;
  userId?: number;
  quantity: number;
  price?:number;
  totalPrice: number;
  gst?: number;
  deliveryCharge?: number;
  platformCharge?: number;
  grandTotalPrice?: number;
  menuName:string;
  itemName:string;
  image?: string;
  menuDescription : string;
  description : string;
  menu:Menu;

}