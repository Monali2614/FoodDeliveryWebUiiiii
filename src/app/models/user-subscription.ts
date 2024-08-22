export class UserSubscription {
  id: number;
  restaurantId: number;
  startDate: Date | null;
  endDate: Date | null;
  subscriptionType: string; 
  status: string;
  price: number;
  username: string;

constructor(
  id: number,
  restaurantId: number,
  subscriptionType: string,
  status: string,
  price: number, 
  startDate: Date | null = null,
  username: string
  
) {
  this.startDate = null; 
  this.endDate = null;
  this.id = id;
  this.restaurantId = restaurantId;
  this.subscriptionType = subscriptionType; 
  this.status = status;
  this.price = price; 
  this.username = username;
}

setDates(startDate: Date): void {
  this.startDate = startDate;
  if (this.subscriptionType === 'Weekly Subscription') {
    this.endDate = new Date(startDate.getTime());
    this.endDate.setDate(this.endDate.getDate() + 4);
  } else if (this.subscriptionType === 'Monthly Subscription') {
    this.endDate = new Date(startDate.getTime());
    this.endDate.setDate(this.endDate.getDate() + 29);
  }
}
}
