import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'src/app/models/subscription';

import { SharedDataService } from 'src/app/service/shared-data.service';
import { SubscriptionService } from 'src/app/service/subscription.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  userId: number = 0; // Replace with actual user ID retrieval logic
  restaurantId: number = 1; // Replace with actual restaurant ID retrieval logic

  selectedStartDate: string | null = null;

  weeklyPrice: number = 1000; // Dummy price for weekly subscription
  monthlyPrice: number = 3000; // Dummy price for monthly subscription

  constructor(private router: Router, private sharedDataService: SharedDataService,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit(): void {
    this.userId = this.sharedDataService.getUserData().id;
  }

  selectSubscription(subscriptionType: string) {
    if (this.selectedStartDate) {
      const startDate = new Date(this.selectedStartDate);
      console.log(startDate,'start date');
      const subscriptionData = {
        user: { id: this.userId },
        restaurant: { restaurantId: this.restaurantId },
        subscriptionType: subscriptionType,
        startDate: startDate.toISOString().split('T')[0], // Convert to YYYY-MM-DD format
        endDate: this.calculateEndDate(subscriptionType, startDate),
        status: 'ACTIVE'
      };

      // Get the price based on subscription type
      const price = this.getPrice(subscriptionType);
      // Set the price in SharedDataService
      this.sharedDataService.setSubscriptionTotalPrice(price);

      // Create the subscription
      this.subscriptionService.createSubscription(subscriptionData).subscribe(
        (response) => {
          console.log('Subscription created successfully:', response);
          // Navigate to payment page
          this.router.navigate(['/payment']);
        },
        (error) => {
          console.error('Error creating subscription:', error);
        }
      );

    } else {
      alert('Please select a start date for your subscription.');
    }
  }

  private calculateEndDate(subscriptionType: string, startDate: Date): string {
    const endDate = new Date(startDate);
    if (subscriptionType === 'WEEKLY') {
      endDate.setDate(startDate.getDate() + 7);
    } else if (subscriptionType === 'MONTHLY') {
      endDate.setMonth(startDate.getMonth() + 1);
      endDate.setDate(startDate.getDate() - 1);
    }
    return endDate.toISOString().split('T')[0]; 
  }

  private getPrice(subscriptionType: string): number {
    if (subscriptionType === 'WEEKLY') {
      return this.weeklyPrice;
    } else if (subscriptionType === 'MONTHLY') {
      return this.monthlyPrice;
    }
    return 0;
  }
}