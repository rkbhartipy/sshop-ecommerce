import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : any = [];
  public val:any;
  public productList =new BehaviorSubject<any>([]);

  constructor() { 

  }

  addlen(len:any){
    this.val=len
    console.log("val :", this.val)
  }








  
  getProducts(){
    return this.productList.asObservable();
  }

  addtoCart(product:any){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList)
  }

  removeCartItem(product:any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id===a.id){
        this.cartItemList.splice(index,1)
      }
    })
    this.productList.next(this.cartItemList);
  }

  removeAll(){
    this.cartItemList=[]
    this.productList.next(this.cartItemList);
  }
}
