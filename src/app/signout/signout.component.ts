import { Component, OnInit } from '@angular/core';
import { AuthService } from '../database/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  
  ngOnInit(){
    this.authService.logout();
    this.reloadThePage()
  }

  reloadThePage(){
    let currentUrl=this.router.url
    this.router.navigateByUrl("/", {skipLocationChange:true}).then(()=>{
      this.router.navigate(['/'])
    })
  }
}
