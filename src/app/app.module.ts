import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';

//forms module
import { FormsModule } from '@angular/forms';

// custom component 
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { TitleandsearchComponent } from './titleandsearch/titleandsearch.component';
import { SliderComponent } from './slider/slider.component';
import { FooterComponent } from './footer/footer.component';
import { CategoryComponent } from './category/category.component';
import { PhonesComponent } from './phones/phones.component';
import { HeadphonesComponent } from './headphones/headphones.component';
import { ComputersComponent } from './computers/computers.component';
import { LaptopsComponent } from './laptops/laptops.component';
import { CamerasComponent } from './cameras/cameras.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { MywishlistComponent } from './mywishlist/mywishlist.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderplacedComponent } from './orderplaced/orderplaced.component';

// firebase modules
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireDatabaseModule } from "@angular/fire/database";

// local modules
import { environment } from "../environments/environment";
import { CartComponent } from './cart/cart.component';

//auth module
import { ReactiveFormsModule } from "@angular/forms";
import { SignoutComponent } from './signout/signout.component';

//auth guard
import { SshopGuard } from './sshop.guard';
import { AuthService } from './database/auth.service';
import { AlldataService } from './database/alldata.service';
import { EdituserdetailComponent } from './edituserdetail/edituserdetail.component';

// google authentication service
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TitleandsearchComponent,
    SliderComponent,
    FooterComponent,
    CategoryComponent,
    PhonesComponent,
    SignupComponent,
    LoginComponent,
    MyaccountComponent,
    MywishlistComponent,
    CartComponent,
    SignoutComponent,
    EdituserdetailComponent,
    HeadphonesComponent,
    ComputersComponent,
    LaptopsComponent,
    CamerasComponent,
    CheckoutComponent,
    OrderplacedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CarouselModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule
  ],

  providers: [
    SshopGuard,
    AuthService,
    AlldataService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              "276459868957-h4ol1fcqp71q8pcu82htbrobm7huk13o.apps.googleusercontent.com"
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              "397931238614417"
            )
          },
        ],
      } as SocialAuthServiceConfig,
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
