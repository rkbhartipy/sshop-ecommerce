import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlldataService } from '../database/alldata.service'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  userid:any;
  username:any;
  allcartproducts:any=[];

  // fb cart opr 
  public cartProducts: any=[];
  public singleUSerCartProducts: any=[];
  public gtotal: number=0;
  public totalItems: number=0;
  shopNowMsg=false;
  
  removeItemLoader=false;

  constructor(public alldataService: AlldataService, public router: Router) { }

  ngOnInit(): void {
    console.log("single user cart products is :", this.singleUSerCartProducts )
  }


  placeorder(myform:any){
    console.log("this is checkout function")
    console.log(myform.value.payment)
    this.addtomyorders()
    setTimeout(() =>{console.log("single user cart products is :", this.singleUSerCartProducts)},2000)
  }

  addtomyorders(){
    // getting all the data from FB cart table 
    let userid=localStorage.getItem("userid")
    let userfname=localStorage.getItem("userfullname")
    this.alldataService.getAllCartItems().subscribe((data:any) => {
      if (data){
        this.cartProducts=data.map((e:any)=>{
          return {
            Id: e.payload.doc.id,
            cartUserId: e.payload.doc.data()["ct_userid"],
            cartUserName: e.payload.doc.data()["ct_username"],
            cartProductPrice: e.payload.doc.data()["ct_productprice"],
            cartProductName: e.payload.doc.data()['ct_productname'],
            cartProductImage: e.payload.doc.data()['ct_productimage'],
            cartProductId: e.payload.doc.data()['ct_productid']
          }
        })

        // getting single users all the cart data form 
        let s_no=0;
        for(let i=0; i<this.cartProducts.length; i++){
          if(this.cartProducts[i].cartUserId==userid && this.cartProducts[i].cartUserName==userfname ){
            let record: any ={
              s_no: s_no+=1,
              sub_p_id:this.cartProducts[i].Id,
              sub_userid:this.cartProducts[i].cartUserId,
              sub_username:this.cartProducts[i].cartUserName,
              sub_pprice:this.cartProducts[i].cartProductPrice,
              sub_pname:this.cartProducts[i].cartProductName,
              sub_pimage:this.cartProducts[i].cartProductImage,
              sub_pproductid:this.cartProducts[i].cartProductId,
            }
            this.singleUSerCartProducts[i]=record
          }
        }
        if(this.singleUSerCartProducts.length==0){
          this.shopNowMsg=true
        }
        else{
          for(let i=0;i<this.singleUSerCartProducts.length;i++){
            try{
              this.alldataService.deleteAllItems(this.singleUSerCartProducts[i].sub_p_id).subscribe((data:any)=>{
                if(data){}
                else{}
              })
            }
            catch(Error){}
          }
          this.router.navigate(["/orderplaced"])
        }
      }
    })
  }
}
