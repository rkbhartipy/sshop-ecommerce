import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleauthService {

  user:any;
  isLoogedIn=false;

  constructor(){}

  loginGoogle(){
    localStorage.setItem("sUserName", this.user.name)
    localStorage.setItem("sUserEmail", this.user.email)
    localStorage.setItem("sUserPhotoUrl", this.user.photoUrl)
    localStorage.setItem("isUserLoggedIn", "true")
    this.isLoogedIn=true
    window.location.reload()
  }
}
