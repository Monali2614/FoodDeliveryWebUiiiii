export class Subscription {
  type: string;
  description: string;
  price: number;
  startDate: Date | null;
  endDate: Date | null;

  constructor(type: string, description: string, price: number) {
    this.type = type;
    this.description = description;
    this.price = price;
    this.startDate = null;
    this.endDate = null;
  }

  setDates(startDate: Date): void {
    this.startDate = startDate;
    if (this.type === 'Weekly Subscription') {
      this.endDate = new Date(startDate.getTime());
      this.endDate.setDate(this.endDate.getDate() + 6);
    } else if (this.type === 'Monthly Subscription') {
      this.endDate = new Date(startDate.getTime());
      this.endDate.setDate(this.endDate.getDate() + 29);
    }
  }
}