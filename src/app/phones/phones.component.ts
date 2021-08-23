import { Component } from '@angular/core';
import { AlldataService } from '../database/alldata.service';
import { CartService } from '../data/cart.service';
import { AuthService } from '../database/auth.service';

@Component({
  selector: 'app-phones',
  templateUrl: './phones.component.html',
  styleUrls: ['./phones.component.css']
})
export class PhonesComponent {

  loader=false;
  allfetchedmobiles:any;
  currentdata:any;

  constructor(
    private alldataService: AlldataService,
    private cartService: CartService,
    private authService: AuthService,) {
    this.fetchPhoneData()
  }

  fetchPhoneData(){
    this.loader=true
    this.alldataService.getMobiles().subscribe((data:any)=>{
      this.allfetchedmobiles = data.map((e:any)=>{
        return {
          ProductId:e.payload.doc.id,
          ProductName:e.payload.doc.data()['mname'],
          ProductImageurl:e.payload.doc.data()['mimageurl'],
          ProductPrice:e.payload.doc.data()['mprice'],
        }
      })
      this.loader=false
      this.allfetchedmobiles.forEach((a:any)=>{
        Object.assign(a,{quantiry:1, total:a.price})
      })
    })
  }

  addtocart(item:any){
    let localStData=localStorage.getItem("isUserLoggedIn")
    if(localStData=="true"){
      this.cartService.addtoCart(item)
    }
    else{
      alert("Please login first")
    }
  }
}
