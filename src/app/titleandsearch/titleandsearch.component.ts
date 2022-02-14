import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-titleandsearch',
  templateUrl: './titleandsearch.component.html',
  styleUrls: ['./titleandsearch.component.css']
})
export class TitleandsearchComponent implements OnInit {

  private keyval:any;

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  searchkeysubmit(searchkeyform:any){
    this.keyval=searchkeyform.value.searchkey;
    if(this.keyval=="mobile" || this.keyval=="MOBILE" || this.keyval=="mob" || this.keyval=="MOB" || this.keyval=="mobiles" || this.keyval=="MOBILES"){
      this.router.navigate(["mobile"]);
    }
    else if(this.keyval=="laptop" || this.keyval=="LAPTOP" || this.keyval=="pc" || this.keyval=="pcs" || this.keyval=="LAPTOPS" || this.keyval=="laptops"){
      this.router.navigate(["laptop"]);
    }
    else if(this.keyval=="computer" || this.keyval=="desktop" || this.keyval=="COMPUTER" || this.keyval=="DESKTOP" || this.keyval=="computers" || this.keyval=="COMPUTERS"){
      this.router.navigate(["computer"]);
    }
    else if(this.keyval=="tablet" || this.keyval=="tab" || this.keyval=="TAB" || this.keyval=="TABLET" || this.keyval=="TABLETS" || this.keyval=="tablets" || this.keyval=="TABS" || this.keyval=="tabs"){
      this.router.navigate(["tablet"]);
    }
    else if(this.keyval=="headphone" || this.keyval=="headset" || this.keyval=="HEADPHONE" || this.keyval=="HEADSET" || this.keyval=="headphones" || this.keyval=="HEADPHONES"){
      this.router.navigate(["headphone"]);
    }
    else if(this.keyval=="camera" || this.keyval=="CAMERA" || this.keyval=="cam" || this.keyval=="WEBCAM" || this.keyval=="CAMERAS" || this.keyval=="cameras"){
      this.router.navigate(["camera"]);
    }
    else{
      alert("Please enter valid key")
    }
  }
}
