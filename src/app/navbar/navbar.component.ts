import { Component, OnInit } from '@angular/core';
import { AlldataService } from '../database/alldata.service';
import { Router } from '@angular/router';
import { AuthService } from '../database/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

  isUserLoggedIn:boolean = false;
  public totalItem:number = 0;  
  public currentUsername:any ="User";
  public greeting:string = "Welcome";
  public currentDateTime:Date=new Date()

  constructor(
    private allDataService:AlldataService,
    private router:Router,
    private authService:AuthService,
  )
  {
    // filtering all data from cart 
    let alldata:any=[];
    this.allDataService.getAllCartItems().subscribe(data =>{
      if (data){
        alldata=data.map((e:any)=>{
          return {
            userid:e.payload.doc.data()['ct_userid'],
          }
        })
        // filtering all data from cart for current user
        this.totalItem=0;
        for(let i=0;i<alldata.length;i++){
          if((alldata[i].userid)==(localStorage.getItem('userid'))){
            let record: any ={
              "s_no":this.totalItem+=1,
            }
          } 
        }        
      }
    })
  }

  ngOnInit() {
    let storeData = localStorage.getItem("isUserLoggedIn");
    let alldata:any=[];
    if( storeData != null && storeData == "true"){
      this.isUserLoggedIn = true;    
      this.usernameAndGreeting()
    }
    else{
      this.isUserLoggedIn = false;
    }
  }

  usernameAndGreeting(){
    setInterval(()=>{
      this.currentDateTime=new Date();
    },1)
    let fbName=localStorage.getItem("userfullname")
    let sName=localStorage.getItem("sUserName")
  
    if(fbName==null){
      this.currentUsername=sName
    }
    else{
      this.currentUsername=fbName
    }

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

  refreshThePage(){
    let currentUrl=this.router.url
    this.router.navigateByUrl('/', {skipLocationChange:true}).then(()=>{
      this.router.navigate([currentUrl])
    })
  }
}
