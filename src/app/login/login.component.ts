import { Component, OnInit } from '@angular/core';
import { AuthService } from '../database/auth.service';
import { Router } from '@angular/router';
import { AlldataService } from '../database/alldata.service';
import { GoogleauthService } from '../database/googleauth.service';
// social auth modules
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username="";
  password="";
  alluserdata:any;
  loginloader=false;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    public socialAuthService: SocialAuthService,
    // local injector
    public gAService: GoogleauthService,
    public alldataService: AlldataService,
    ) { }


  ngOnInit(): void {
  }

  googleLogin(){
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
    this.socialAuthService.authState.subscribe((data:any)=>{
      if(data){
        this.gAService.user=data
        this.gAService.loginGoogle()
      }
    })
  }

  facebookLogin(){
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
  }

  
  // guard authentication
  //login step 1
  onClickSubmit(){
    this.loginloader=true;
    if(this.username!="" || this.password!=""){
      this.fetchingUserData();
      setTimeout(() =>{this.checkingCredentials()},2000)
    }
    else{
      alert("please enter valid data")
    }
  }

  //login step 2
  fetchingUserData(){
    this.alldataService.getUserData().subscribe((data:any)=>{
      this.alluserdata = data.map((e:any)=>{
        return {
          Id: e.payload.doc.id,
          Fullname: e.payload.doc.data()['fullname'],
          Email: e.payload.doc.data()['email'],
          Password: e.payload.doc.data()['password'],
          Phone: e.payload.doc.data()['phone'],
          State: e.payload.doc.data()['state'],
          Country: e.payload.doc.data()['country'],
          Address: e.payload.doc.data()['address'],
        }
      })
    })
  }

  //login step 3
  checkingCredentials(){
    let arr=this.alluserdata
    let loggedin_successfully_or_not:any=""

    for(let i=0; i<arr.length; i++){
  
      // used in this function only for verifying user.
      let id=arr[i].Id
      let fullname=arr[i].Fullname
      let loginemailid=arr[i].Email
      let loginpassword=arr[i].Password

      if((this.username==loginemailid) && (this.password==loginpassword) && ((this.username!="") || (this.password!="")) ){
        this.authService.login(loginemailid, loginpassword, id, fullname).subscribe((data:any)=>{
          window.location.reload()
          if(data) {
            this.router.navigate(['myaccount/'])
          }
        })
        // this will run if user enters correct data
        loggedin_successfully_or_not=true;
        break;
      }
      else{
        // this will show user not logged in notification after checking
        loggedin_successfully_or_not=false;
      }
    }

    // to show notification on the basis of assigned val to logged_in_suse...
    if(loggedin_successfully_or_not==true){
      //when logs in successfully
      this.loginloader=false
    }
    else{
      // when login falis
      alert("Username or password is incorrect")
      this.loginloader=false
    }
  }

}