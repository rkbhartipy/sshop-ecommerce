import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PhonesComponent } from './phones/phones.component';
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from './login/login.component';
import { SignoutComponent } from './signout/signout.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { MywishlistComponent } from './mywishlist/mywishlist.component';
import { SshopGuard } from './sshop.guard';


const routes: Routes = [
  {path:"", redirectTo:"homepage", pathMatch:"full"},
  {path:"homepage", component: HomeComponent},
  {path:"phonepage", component: PhonesComponent},
  {path:"myaccountpage", component: MyaccountComponent, canActivate:[SshopGuard]},
  {path:"mywishlistpage", component: MywishlistComponent, canActivate:[SshopGuard]},
  {path:"signuppage", component: SignupComponent},
  {path:"signinpage", component: LoginComponent},
  {path:"signoutpage", component: SignoutComponent},
  {path:"**", redirectTo:"homepage", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
