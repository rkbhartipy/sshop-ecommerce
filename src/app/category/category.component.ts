import { Component, OnInit } from '@angular/core';
import { AlldataService } from "../database/alldata.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  allcategorydata:any;
  loader=false;

  constructor(private alldataService: AlldataService) {
    this.fetchData()
   }
  ngOnInit(): void {
  }

  fetchData(){
    this.loader=true;
    this.alldataService.getCategoryData().subscribe((data:any)=>{
      this.allcategorydata = data.map((e:any)=>{
        return {
          id:e.payload.doc.data()['cid'],
          name:e.payload.doc.data()['cname'],
          imageurl:e.payload.doc.data()['cimageurl']
        }
      })
      this.loader=false
    })

  }
}





