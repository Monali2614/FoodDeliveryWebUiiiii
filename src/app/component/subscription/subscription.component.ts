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

  selectedStartDate: string | null = null;
  subscriptionType: string | null = null;
  weeklyPrice: number = 1000; // Example price for weekly subscription
  monthlyPrice: number = 3000; // Example price for monthly subscription

  constructor(
    private router: Router,
    private subscriptionService: SubscriptionService,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit(): void {
  }

  selectSubscription(subscriptionType: string) {
    if (this.selectedStartDate && subscriptionType) {
      const startDate = new Date(this.selectedStartDate);
      const endDate = this.calculateEndDate(subscriptionType, startDate);

      // Determine the price based on the subscription type
      let price = 0;
      if (subscriptionType === 'WEEKLY') {
        price = this.weeklyPrice;
      } else if (subscriptionType === 'MONTHLY') {
        price = this.monthlyPrice;
      }

      // Set the total price in SharedDataService
      this.sharedDataService.setSubscriptionTotalPrice(price);

      const subscriptionData = {
        user: { id: 1 }, // Replace with actual user ID retrieval logic
        restaurant: { restaurantId: 1 }, // Replace with actual restaurant ID retrieval logic
        subscriptionType: subscriptionType,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        status: 'ACTIVE'
      };

      this.subscriptionService.createSubscription(subscriptionData).subscribe(
        (response) => {
          console.log('Subscription created successfully:', response);
          this.router.navigate(['/payment']); // Navigate to payment page
        },
        (error) => {
          console.error('Error creating subscription:', error);
        }
      );
    } else {
      alert('Please select a start date and subscription type.');
    }
  }

  private calculateEndDate(subscriptionType: string, startDate: Date): Date {
    const endDate = new Date(startDate);
    if (subscriptionType === 'WEEKLY') {
      endDate.setDate(startDate.getDate() + 7);
    } else if (subscriptionType === 'MONTHLY') {
      endDate.setMonth(startDate.getMonth() + 1);
      endDate.setDate(startDate.getDate() - 1);
    }
    return endDate;
  }
}