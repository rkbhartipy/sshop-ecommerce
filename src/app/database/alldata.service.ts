import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class AlldataService {

  // userdata variables to be used in any component

  constructor(private firestore:AngularFirestore) { }

  // products data operaion
  getCategoryData(){
    return this.firestore.collection('category').snapshotChanges();
  }

  getMobiles(){
    return this.firestore.collection('mobilephones').snapshotChanges();
  }

  getCartProducts(){
    return this.firestore.collection('products_in_cart').snapshotChanges();
  }

  addCartProducts(record:any){
    return this.firestore.collection("products_in_cart").add(record)
  }

  // user data operation 
  addUser(record:any){
    return this.firestore.collection('signuptable').add(record);
  }

  getUserData(){
    return this.firestore.collection("signuptable").snapshotChanges();
  }

  updateUserData(recordId:any, record:any){
    this.firestore.doc("signuptable/" + recordId).update(record);
  }


}
