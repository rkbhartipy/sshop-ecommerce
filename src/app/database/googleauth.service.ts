import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleauthService {

  user:any;
  isLoggedIn=false;

  constructor(){}

  loginGoogle(){
    localStorage.setItem("sUserName", this.user.name)
    localStorage.setItem("sUserEmail", this.user.email)
    localStorage.setItem("sUserPhotoUrl", this.user.photoUrl)
    localStorage.setItem("isUserLoggedIn", "true")
    this.isLoggedIn=true
    localStorage.setItem('isGLoggedIn', "true");
    localStorage.setItem('isFBLoggedIn', "false");
    window.location.reload()
  }
}
