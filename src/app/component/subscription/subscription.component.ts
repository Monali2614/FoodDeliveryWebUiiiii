import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'src/app/models/subscription';

import { SharedDataService } from 'src/app/service/shared-data.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  weeklySubscription: Subscription = new Subscription(
    'Weekly Subscription',
    'A weekly subscription plan for our delicious meals.',
    1000 
  );

  monthlySubscription: Subscription = new Subscription(
    'Monthly Subscription',
    'A monthly subscription plan for our delicious meals.',
    3000 
  );


  selectedStartDate: string | null = null;

  price: number = 0;

  constructor(private router: Router, private sharedDataService: SharedDataService) {}

  ngOnInit(): void {
    const subscription = this.sharedDataService.getSubscription();   

  }

  // Method to handle subscription selection
  selectSubscription(subscription: Subscription) {
    if (this.selectedStartDate) {
      const startDate = new Date(this.selectedStartDate);
      subscription.setDates(startDate);

      console.log(`Selected subscription: ${subscription.type}`);
      console.log(`Price: ₹${subscription.price}`);
      console.log(`Start Date: ${subscription.startDate}`);
      console.log(`End Date: ${subscription.endDate}`);

      this.sharedDataService.setSubscrptionTotalPrice(subscription.price);

      this.router.navigate(['/payment']);

    
    } else {
      alert('Please select a start date for your subscription.');
    }
  }
}

