import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { AdminComponent } from './component/admin/admin.component';
import { LoginComponent } from './component/login/login.component';
import { AdminPanelComponent } from './component/admin-panel/admin-panel.component';
import { AddRestaurantComponent } from './component/add-restaurant/add-restaurant.component';
import { AddMenuComponent } from './component/add-menu/add-menu.component';
import { ViewRestaurantsComponent } from './component/view-restaurants/view-restaurants.component';
import { EditRestaurantComponent } from './component/edit-restaurant/edit-restaurant.component';
import { SearchrestaurantbyitemComponent } from './component/searchrestaurantbyitem/searchrestaurantbyitem.component';
import { HomeComponent } from './component/home/home.component';
import { PaymentComponent } from './component/payment/payment.component';
import { RestaurantListComponent } from './component/restaurant-list/restaurant-list.component';
import { WishlistComponent } from './component/wishlist/wishlist.component';
import { EditProfileComponent } from './component/edit-profile/edit-profile.component';
import { MenuComponent } from './component/menu/menu.component';
import { CartComponent } from './component/cart/cart.component';
import { ChatboxComponent } from './component/chatbox/chatbox.component';
import { ProfileComponent } from './component/profile/profile.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { LeafletMapComponent } from './component/leaflet-map/leaflet-map.component';
import { TermsConditionsComponent } from './component/terms-conditions/terms-conditions.component';
import { AddImagesComponent } from './component/add-images/add-images.component';
import { ShowRestaurantComponent } from './component/show-restaurant/show-restaurant.component';
import { RegisterComponent } from './component/register/register.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { VerifiyOtpResetComponent } from './component/verifiy-otp-reset/verifiy-otp-reset.component';
import { VerifiyOtpRegisterComponent } from './component/verifiy-otp-register/verifiy-otp-register.component';
import { ReviewComponent } from './component/review/review.component';
import { AuthGuard } from './auth.guard';
import { AdminregisterComponent } from './component/adminregister/adminregister.component';
import { MessageComponent } from './component/message/message.component';
import { SubscriptionComponent } from './component/subscription/subscription.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin-panel', component: AdminPanelComponent },
  { path: 'addrestaurant', component: AddRestaurantComponent },
  { path: 'home', component: HomeComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'searchrestaurantbyitem', component: SearchrestaurantbyitemComponent },
  { path: 'login', component: LoginComponent },
 
  { path: 'restaurant-list', component: RestaurantListComponent },
  { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard] },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'menu/:restaurantName', component: MenuComponent },

  { path: 'chatbox', component: ChatboxComponent, canActivate: [AuthGuard] },
  { path: 'add-menu', component: AddMenuComponent },
  { path: 'view-restaurants', component: ViewRestaurantsComponent },
  { path: 'edit-restaurant/:id', component: EditRestaurantComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'leaflet-map', component: LeafletMapComponent },
  { path: 'terms-conditions', component: TermsConditionsComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'add-images', component: AddImagesComponent },
  { path: 'show-restaurant', component: ShowRestaurantComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verifyotpreset', component: VerifiyOtpResetComponent },
  { path: 'verifyotpregister', component: VerifiyOtpRegisterComponent },
  { path: 'adminregister', component: AdminregisterComponent },
  { path: 'review', component: ReviewComponent },
  { path: 'message', component: MessageComponent },
  { path: 'cart', component: CartComponent},
  { path: 'subscription', component: SubscriptionComponent ,canActivate:[AuthGuard]},





  // Add a wildcard route for any undefined paths
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
