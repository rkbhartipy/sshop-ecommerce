import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../database/auth.service';
import { AlldataService } from '../database/alldata.service';


@Component({
  selector: 'app-edituserdetail',
  templateUrl: './edituserdetail.component.html',
  styleUrls: ['./edituserdetail.component.css']
})
export class EdituserdetailComponent implements OnInit {

  fetchedFullname:string="";
  fetchedUserIdEmail:string="";
  fetchedPhone:string="";
  fetchedState:string="";
  fetchedCountry:string="";
  fetchedAddress:any="";

  //for the logic of this component file
  url_user_id:any="";
  url_add:any=false
  url_edit:any=false
  allfetcheduserdata:any;

  constructor(
            private route: ActivatedRoute, 
            private authService: AuthService, 
            private alldataService: AlldataService, 
            private router: Router
            ){ }

  ngOnInit(): void {
    this.alldataService.getUserData().subscribe((data:any)=>{
      this.allfetcheduserdata = data.map((e:any)=>{
        return {
          Id: e.payload.doc.id,
          Fullname: e.payload.doc.data()['fullname'],
          UseridEmail: e.payload.doc.data()['email'],
          Phone: e.payload.doc.data()['phone'],
          State: e.payload.doc.data()['state'],
          Country: e.payload.doc.data()['country'],
          Address: e.payload.doc.data()['address'],
        }
      })
    })

    //catch user id from url
    this.route.paramMap.subscribe((params:ParamMap) =>{
      this.url_user_id = params.get('id');
    })
    //catch "address" or "edit" from url to disable or enable particular field
    // enable disable add and other fields respectivily
    this.route.paramMap.subscribe((params:ParamMap) => {
      let add_or_edit = params.get('editoraddress')

      if(add_or_edit=="edit"){
        this.url_edit=true;
        this.url_add=false
      }
      else{
        this.url_add=true
        this.url_edit=false
      }
    })

    setTimeout(()=>{this.matchCurrentUserWithTable()},500)
  }

  matchCurrentUserWithTable(){
    let arr=this.allfetcheduserdata
    for (let i=0;i<arr.length;i++){
      let id=arr[i].Id
      if(this.url_user_id==id){
        this.fetchedFullname=arr[i].Fullname
        this.fetchedUserIdEmail=arr[i].UseridEmail
        this.fetchedPhone=arr[i].Phone
        this.fetchedState=arr[i].State
        this.fetchedCountry=arr[i].Country
        this.fetchedAddress=arr[i].Address
        break;
      }
    }
  }

  updateNewDetails(updateForm:any){
    let record:any={};

    record['fullname']=this.fetchedFullname
    record['phone']=this.fetchedPhone
    record['state']=this.fetchedState
    record['country']=this.fetchedCountry

    if(this.fetchedAddress==undefined){
      record['address']="no address added"
    }
    else{
      record['address']=this.fetchedAddress
    }

    this.alldataService.updateUserData(this.url_user_id, record)
    alert("Data update successfully")
    this.router.navigate(['myaccountpage/'])
  }
}
