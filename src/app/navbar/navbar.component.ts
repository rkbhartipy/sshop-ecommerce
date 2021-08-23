import { Component, OnInit } from '@angular/core';
import { AuthService } from '../database/auth.service';
import { CartService } from '../data/cart.service';
import { AlldataService } from '../database/alldata.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{



  isUserLoggedIn:boolean = false;
  public totalitem:number = 0;
  public currentUsername:any ="User";
  public greeting:string = "Welcome";
  public currentDateTime:Date=new Date()

  constructor(private cartService: CartService, private alldataService: AlldataService){}


  ngOnInit() {
    let storeData = localStorage.getItem("isUserLoggedIn");
    if( storeData != null && storeData == "true"){
       this.isUserLoggedIn = true;
       // getting number of products added to cart
        this.cartService.getProducts().subscribe((res=>{
          this.totalitem=res.length;
        }))
        this.usernameAndGreeting()
    }
    else
       this.isUserLoggedIn = false;
  }

  usernameAndGreeting(){
    setInterval(()=>{
      this.currentDateTime=new Date();
    },1)
    this.currentUsername=localStorage.getItem("userfullname")
    this.currentUsername=localStorage.getItem("sUserName")
    let hours=this.currentDateTime.getHours()
    if(hours>=0 && hours<=12){
      this.greeting="Good morning"
    }
    else if(hours>=12 && hours<=16){
      this.greeting="Good afternoon"
    }
    else{
      this.greeting="Good evening"
    }
  }

}
