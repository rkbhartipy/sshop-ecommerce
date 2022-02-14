import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class AlldataService {

  // userdata variables to be used in any component

  public totalCartItems: number = 0;

  constructor(
    private firestore:AngularFirestore,
    ) { }

  // products data operaion
  getCategoryData(){
    return this.firestore.collection('category').snapshotChanges();
  }

  getMobiles(){
    return this.firestore.collection('mobilephones').snapshotChanges();
  }

  // getCartProducts(){
  //   return this.firestore.collection('products_in_cart').snapshotChanges();
  // }

  // addCartProducts(record:any){
  //   return this.firestore.collection("products_in_cart").add(record)
  // }

  // fetch computers data from fb
  getComputers(){
    return this.firestore.collection('computers').snapshotChanges();
  }

  getCameras(){
    return this.firestore.collection('cameras').snapshotChanges();
  }

  getHeadphones(){
    return this.firestore.collection('headphones').snapshotChanges()
  }

  getLaptops(){
    return this.firestore.collection('laptops').snapshotChanges()
  }



  // user data operation 
  addUser(record:any){
    return this.firestore.collection('signuptable').add(record);
  }

    // getting single user data
  getUserData(){
    return this.firestore.collection("signuptable").snapshotChanges();
  }

  updateUserData(recordId:any, record:any){
    this.firestore.doc("signuptable/" + recordId).update(record);
  }





  // cart operation
  getAllCartItems(){
    return this.firestore.collection("cart").snapshotChanges();
  }

  addToCart(item:any){
    return this.firestore.collection("cart").add(item);
  }

  deleteSingleItem(productId:any): any{
    return this.firestore.doc("cart/" + productId).delete();
  }

  deleteAllItems(productId:any): any{
    return this.firestore.doc("cart/" + productId).delete()
  }  

  // add to myorders
  addtomyorders(item:any){
    return this.firestore.collection("myorders").add(item);
  }

}
