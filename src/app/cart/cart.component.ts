import { Component, OnInit } from '@angular/core';
import { AlldataService } from '../database/alldata.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  // fb cart opr 
  public cartProducts: any=[];
  public singleUSerCartProducts: any=[];
  public gtotal: number=0;
  public totalItems: number=0;
  shopNowMsg=false;

  removeItemLoader=false;


  constructor(
    private allDataService: AlldataService,
    private router: Router) 
    {
      // getting all the data from FB cart table 
      let userid=localStorage.getItem("userid")
      let userfname=localStorage.getItem("userfullname")
      this.allDataService.getAllCartItems().subscribe((data:any) => {
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
        }
      })
   }

  // update grand total price and quantity of the products 
  ngOnInit(): void {
    let alldata:any=[];
    this.allDataService.getAllCartItems().subscribe(data =>{
      if (data){
        alldata=data.map((e:any)=>{
          return {
            userid:e.payload.doc.data()['ct_userid'],
            username:e.payload.doc.data()['ct_username'],
            productp:e.payload.doc.data()['ct_productprice']
          }
        })
        for(let i=0;i<alldata.length;i++){
          if(alldata[i].userid==localStorage.getItem('userid')){
            this.gtotal+=alldata[i].productp
            this.totalItems+=1
          }
        }
      }
    })

    console.log("single user :", this.singleUSerCartProducts)
  }

  removeItem(prodId:any){
    this.removeItemLoader=true;
    console.log("prod id is :", prodId)
    this.allDataService.deleteSingleItem(prodId).then((data:any) =>{
      this.refreshThePage()
    })
    this.removeItemLoader=true;
  }

  removeAllItems(){
    console.log("called the removeall fun")
    this.removeItemLoader=true;
    let cuserid=localStorage.getItem("userid")
    for(let i=0;i<this.singleUSerCartProducts.length;i++){
      try{
        this.allDataService.deleteAllItems(this.singleUSerCartProducts[i].sub_p_id).subscribe((data:any)=>{
          if(data){
            console.log("got the response")
          }
          else{
            console.log("did not get the response")
          }
        })
      }
      catch (Error) {
        console.log("Error.message")
      }
      this.removeItemLoader=false;
      this.refreshThePage()
    }
  }

  refreshThePage() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

}
