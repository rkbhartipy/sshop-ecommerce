import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { tap, delay } from "rxjs/operators";
import { Router, ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // data to be used in other component which is coming from login compoent
  isUserLoggedIn:boolean=false;
  
  // stop user to go to login page manually
  constructor(private router:Router, private route: ActivatedRoute) {
    if(this.isUserLoggedIn==false) {
      this.router.navigate(['homepage'], { relativeTo: this.route });
    }
   }

  login(username_email: string, loginpassword:string, id:any, fullname:any,):Observable<any>{
    this.isUserLoggedIn=true
    localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn? "true":"false");
    localStorage.setItem('isGLoggedIn', "false");
    localStorage.setItem('isFBLoggedIn', "true");
    localStorage.setItem('userid', this.isUserLoggedIn? id :"false");
    localStorage.setItem('userfullname', this.isUserLoggedIn? fullname :"false");
  return of(this.isUserLoggedIn).pipe(delay(1000),
    tap(val=>{})
  );}

  logout():void {
    this.isUserLoggedIn=false;
    localStorage.removeItem('isUserLoggedIn');
    localStorage.removeItem('userfullname');
    localStorage.removeItem('userid');
    localStorage.removeItem("sUserEmail")
    localStorage.removeItem("sUserName")
    localStorage.removeItem("sUserPhotoUrl")
    localStorage.removeItem('isGLoggedIn')
    localStorage.removeItem('isFBLoggedIn')
    window.location.reload()
  }
}
