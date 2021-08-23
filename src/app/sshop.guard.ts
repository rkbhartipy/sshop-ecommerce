import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './database/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SshopGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let val:any = localStorage.getItem("isUserLoggedIn");
    if(val=="true"){
      return true;
    }
    else{
      alert("Please sign in first")
      return false;
    }
  }
}
