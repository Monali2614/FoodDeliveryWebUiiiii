export interface OrderItem {
  id: number;
  menuId?: number;
  userId?: number;
  quantity: number;
  price?:number;
  totalPrice: number;
  gst?: number;
  deliveryCharge?: number;
  platformCharge?: number;
  grandTotalPrice?: number;
  menuName:string;
  image?: string;
}