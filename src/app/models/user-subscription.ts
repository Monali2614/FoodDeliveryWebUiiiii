export class UserSubscription {
    userId: number;
    restaurantId: number;
    startDate: Date | null;
    endDate: Date | null;
    subscriptionType: string; 
    subscriptionStatus: string;
    price: number;

  constructor(
    userId: number,
    restaurantId: number,
    subscriptionType: string,
    subscriptionStatus: string,
    price: number, 
    startDate: Date | null = null
    
  ) {
    this.startDate = null; 
    this.endDate = null;
    this.userId = userId;
    this.restaurantId = restaurantId;
    this.subscriptionType = subscriptionType; 
    this.subscriptionStatus = subscriptionStatus;
    this.price = price; 
  }

  setDates(startDate: Date): void {
    this.startDate = startDate;
    if (this.subscriptionType === 'Weekly Subscription') {
      this.endDate = new Date(startDate.getTime());
      this.endDate.setDate(this.endDate.getDate() + 6);
    } else if (this.subscriptionType === 'Monthly Subscription') {
      this.endDate = new Date(startDate.getTime());
      this.endDate.setDate(this.endDate.getDate() + 29);
    }
  }
}
