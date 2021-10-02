import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlldataService } from "../database/alldata.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  fullname="";
  email="";
  password="";
  confirmpassword=""
  mismatchpassworderror="";

  constructor(private alldataService: AlldataService, private router: Router) { }

  ngOnInit(): void {
  }

  createRecord(){
    let record:any={};
    record["fullname"]=this.fullname;
    record["email"]=this.email;
    record["password"]=this.password;
    record["confirmpassword"]=this.confirmpassword;

    if((this.password==this.confirmpassword) && ((this.fullname!="") || (this.email!="")) && ((this.password!="") || (this.password!="")) ){
      this.alldataService.addUser(record).then((response:any)=>{
        this.fullname=""
        this.email=""
        this.password=""
        this.confirmpassword=""
        console.log(response);
        alert("Congratlatulations, you have registered successfully!");
        this.router.navigate(['/'])
      }).catch(()=>{})
    }
    else{
      this.mismatchpassworderror="password did not match"
    }
  }
}
