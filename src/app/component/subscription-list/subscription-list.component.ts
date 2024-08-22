import { Component } from '@angular/core';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { SubscriptionService } from 'src/app/service/subscription.service';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.css']
})
export class SubscriptionListComponent {
  subscriptions: any[] = [];
  restaurantId: number = 1; // Example restaurant ID
  userId: number = 0; // Example user ID

  constructor(private subscriptionService: SubscriptionService,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit(): void {
    this.getSubscriptions(); 
    this.userId = this.sharedDataService.getUserData().id; 
  }

  getSubscriptions(): void {
    this.subscriptionService.getSubscriptionsByRestaurantAndUser(this.restaurantId, this.userId)
      .subscribe((data: any[]) => {
        this.subscriptions = data;
        console.log(this.subscriptions, 'Subscriptions');
      }, (error) => {
        console.error('Error fetching subscriptions:', error);
      });
  }

}
