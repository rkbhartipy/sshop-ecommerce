import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PhonesComponent } from './phones/phones.component';
import { CamerasComponent } from './cameras/cameras.component';
import { ComputersComponent } from './computers/computers.component';
import { LaptopsComponent } from './laptops/laptops.component';
import { HeadphonesComponent } from './headphones/headphones.component';
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from './login/login.component';
import { SignoutComponent } from './signout/signout.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { MywishlistComponent } from './mywishlist/mywishlist.component';
import { SshopGuard } from './sshop.guard';
import { CartComponent } from './cart/cart.component';
import { EdituserdetailComponent } from './edituserdetail/edituserdetail.component';

const routes: Routes = [
  {path:"", redirectTo:"homepage", pathMatch:"full"},
  {path:"homepage", component: HomeComponent},

  {path:"computer", component: ComputersComponent},
  {path:"camera", component: CamerasComponent},
  {path:"laptop", component: LaptopsComponent},
  {path:"headphone", component: HeadphonesComponent},
  {path:"tablet", component: PhonesComponent},
  {path:"mobile", component: PhonesComponent},

  {path:"myaccountpage", component: MyaccountComponent, canActivate:[SshopGuard]},
  {path:"mywishlistpage", component: MywishlistComponent, canActivate:[SshopGuard]},
  {path:"signuppage", component: SignupComponent},
  {path:"signinpage", component: LoginComponent},
  {path:"signoutpage", component: SignoutComponent},
  {path:"updateinfopage/:id/:editoraddress", component: EdituserdetailComponent},
  {path:"cartpage", component: CartComponent, canActivate:[SshopGuard]},
  {path:"**", redirectTo:"homepage", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
