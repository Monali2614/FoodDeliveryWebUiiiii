import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { AdminComponent } from './component/admin/admin.component';
import { AdminPanelComponent } from './component/admin-panel/admin-panel.component';
import { AddRestaurantComponent } from './component/add-restaurant/add-restaurant.component';
import { HomeComponent } from './component/home/home.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from './service/user.service';
import { MenuService } from './service/menu.service';
import { RestaurantService } from './service/restaurant.service';
import { PaymentComponent } from './component/payment/payment.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchrestaurantbyitemComponent } from './component/searchrestaurantbyitem/searchrestaurantbyitem.component';
import { RestaurantListComponent } from './component/restaurant-list/restaurant-list.component';
import { LoginComponent } from './component/login/login.component';
import { WishlistComponent } from './component/wishlist/wishlist.component';
import { EditProfileComponent } from './component/edit-profile/edit-profile.component';
import { MenuComponent } from './component/menu/menu.component';
import { CartComponent } from './component/cart/cart.component';
import { ChatboxComponent } from './component/chatbox/chatbox.component';
import { AddMenuComponent } from './component/add-menu/add-menu.component';
import { ViewRestaurantsComponent } from './component/view-restaurants/view-restaurants.component';
import { EditRestaurantComponent } from './component/edit-restaurant/edit-restaurant.component';
import { ProfileComponent } from './component/profile/profile.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeafletMapComponent } from './component/leaflet-map/leaflet-map.component';
import { TermsConditionsComponent } from './component/terms-conditions/terms-conditions.component';
import { AddImagesComponent } from './component/add-images/add-images.component';
import { ShowRestaurantComponent } from './component/show-restaurant/show-restaurant.component';
import { RegisterComponent } from './component/register/register.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { VerifiyOtpResetComponent } from './component/verifiy-otp-reset/verifiy-otp-reset.component';
import { VerifiyOtpRegisterComponent } from './component/verifiy-otp-register/verifiy-otp-register.component';
import { ReviewComponent } from './component/review/review.component';
import { AdminregisterComponent } from './component/adminregister/adminregister.component';
import { MessageComponent } from './component/message/message.component';
import { SubscriptionComponent } from './component/subscription/subscription.component';
import { SubscriptionListComponent } from './component/subscription-list/subscription-list.component';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AdminComponent,
    AdminPanelComponent,
    AddRestaurantComponent,
    HomeComponent,
    PaymentComponent,
    SearchrestaurantbyitemComponent,
    RestaurantListComponent,
    LoginComponent,
    WishlistComponent,
    EditProfileComponent,
    MenuComponent,
    CartComponent,
    ChatboxComponent,
    AddMenuComponent,
    ViewRestaurantsComponent,
    EditRestaurantComponent,
    ProfileComponent,
   CheckoutComponent,
   LeafletMapComponent,
   TermsConditionsComponent,
   AddImagesComponent,
   ShowRestaurantComponent,
   RegisterComponent,
   ResetPasswordComponent,
   ForgotPasswordComponent,
   VerifiyOtpResetComponent,
   VerifiyOtpRegisterComponent,
   ReviewComponent,
   AdminregisterComponent,
   
   MessageComponent,
       SubscriptionComponent,
       SubscriptionListComponent
   
  ],
  imports: [
    BrowserModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [UserService, MenuService, RestaurantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
