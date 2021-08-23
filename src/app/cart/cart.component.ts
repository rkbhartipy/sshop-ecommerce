import { Component, OnInit } from '@angular/core';
import { CartService } from '../data/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public product : any= [];
  public grandTotal !: number;
  public gtotal: number=0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe(res => {
      this.product=res;
    })
    for (let i=0; i<this.product.length; i++) {
      this.gtotal= this.gtotal + parseInt((this.product[i].ProductPrice));
    }
  }

  removeItem(item:any){
    this.cartService.removeCartItem(item)
  }

  empty_cart(){
    this.cartService.removeAll()
  }

}
