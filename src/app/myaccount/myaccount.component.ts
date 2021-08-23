import { Component, OnInit } from '@angular/core';
import { AuthService } from '../database/auth.service';
import { AlldataService } from '../database/alldata.service';
import { GoogleauthService } from '../database/googleauth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent{


  // getting data from alldataservice
  cuserid:any;
  cuseremail:any;
  cuserfullname:any;
  cuserphone:any;
  cuserstate:any;
  cusercountry:any;
  cuseraddress:any;
  editaddress:boolean=true;
  alluserData:any;

  // getting data from google api
  sname:any;
  semail:any;
  sphotoUrl:any;
  availDetail:boolean=false;

  constructor(
    private alldataService: AlldataService, 
    private googleAuthService: GoogleauthService,
    private authService: AuthService){

    if(this.googleAuthService.isLoogedIn==false && this.authService.isUserLoggedIn==true){
      console.log("firebase authentication is applied")
      this.cuserid = localStorage.getItem("userid");
      this.alldataService.getUserData().subscribe((data:any)=>{
        this.alluserData = data.map((e:any)=>{
          return {
            Id : e.payload.doc.id,
            Email : e.payload.doc.data()['email'],
            Fullname : e.payload.doc.data()['fullname'],
            Phone : e.payload.doc.data()['phone'],
            State : e.payload.doc.data()['state'],
            Country : e.payload.doc.data()['country'],
            Address : e.payload.doc.data()['address'],
          }
        })
        
        let arr:any=this.alluserData
        for(let i=0; i<(arr.length); i++){
          if(arr[i].Id==this.cuserid){
            this.cuserid = arr[i].Id
            this.cuseremail = arr[i].Email
            this.cuserfullname = arr[i].Fullname
            this.cuserphone = arr[i].Phone
            this.cuserstate = arr[i].State
            this.cusercountry = arr[i].Country
            this.cuseraddress = arr[i].Address
          }
        }
      }) 
    }

    else{
      this.getUserGData()
    }

  }

  ngOnInit(){
    if(this.cuseraddress=="" || this.cuseraddress=="undefined"){
      this.editaddress=false;
      console.log('this is from ngonit in myacc')
    }
    
  }

  getUserGData(){
    console.log("from myacocunt page and google authentication")
    this.sname=localStorage.getItem('sUserName')
    this.semail=localStorage.getItem('sUserEmail')
    this.sphotoUrl=localStorage.getItem('sUserPhotoUrl')
    this.availDetail=true;
  }
}