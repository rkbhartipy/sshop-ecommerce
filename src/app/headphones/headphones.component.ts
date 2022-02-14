import { Component } from '@angular/core';
import { AlldataService } from '../database/alldata.service';
import { AuthService } from '../database/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phones',
  templateUrl: './headphones.component.html',
  styleUrls: ['./headphones.component.css']
})
export class HeadphonesComponent {

  loader=false;
  allfetchedheadphones:any=[];


  subCartData:any=[]

  cuser_id=localStorage.getItem("userid")
  localStData=localStorage.getItem("isUserLoggedIn")

  constructor(
    private alldataService: AlldataService,
    private authService: AuthService,
    private router: Router,) 
  {
    this.fetctHeadphonesData()
    this.getAllCartProducts()
  }

  // just showing the mobile products it does not relate to cart
  fetctHeadphonesData(){
    this.loader=true
    this.alldataService.getHeadphones().subscribe((data:any)=>{
      this.allfetchedheadphones = data.map((e:any)=>{
        return {
          ProductId:e.payload.doc.id,
          ProductName:e.payload.doc.data()['caname'],
          ProductImageurl:e.payload.doc.data()['caimage'],
          ProductPrice:e.payload.doc.data()['caprice'],
        }
      })
      this.loader=false
    })
    console.log("from camera :", this.allfetchedheadphones)
  }

  getAllCartProducts(){
    let allCartData:any=[]
    this.alldataService.getAllCartItems().subscribe((data:any)=>{
      allCartData=data.map((e:any)=>{
        return {
          p_id: e.payload.doc.data()['ct_productid'],
          p_image: e.payload.doc.data()['ct_productimage'],
          p_name: e.payload.doc.data()['ct_productname'],
          p_price: e.payload.doc.data()['ct_productprice'],
          p_userid: e.payload.doc.data()['ct_userid'],
          p_username: e.payload.doc.data()['ct_username'],
        }
      })
      for(let i=0; i<allCartData.length; i++){
        if(allCartData[i].p_userid=this.cuser_id){
          let record:any ={
            "sub_p_pid":allCartData[i].p_id,
            "sub_p_image":allCartData[i].p_image,
            "sub_p_name":allCartData[i].p_name,
            "sub_p_price":allCartData[i].p_price,
            "sub_p_userid":allCartData[i].p_userid,
            "sub_p_username":allCartData[i].p_username,
          }       
          this.subCartData[i]=record;   
        }
      }
    })
  }

  addToCart(item:any){
    let userlogin=localStorage.getItem("isUserLoggedIn")
    if(userlogin){
      for(let i=0; i<this.subCartData.length; i++){
        if((this.subCartData[i].sub_p_userid==this.cuser_id) && (this.subCartData[i].sub_p_pid==item.ProductId)){
          alert("Product already added to your cart ")
          break;
        }
        else{
          this.addProductToCart(item)
          break;
        }
      }
    }
    else{
      alert("Please login first")
    }
  }

  addProductToCart(item:any){
    let record:any={
      ["ct_userid"]:this.cuser_id,
      ["ct_username"]:localStorage.getItem("userfullname"),
      ["ct_productprice"]:item.ProductPrice,
      ["ct_productname"]:item.ProductName,
      ["ct_productimage"]:item.ProductImageurl,
      ["ct_productid"]:item.ProductId,
    }
    this.alldataService.addToCart(record).then((data:any)=>{
      if (data){
        console.log("from phone page and value is added to the fb successfully")
      }
      else{
        console.log("the data was not added to the fb from phone page")
      }
    })
  }
}
