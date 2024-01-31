import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  productQuantity:number=1;
  ProductList:any[] = [];
  cartProducts: any;
  cartLength: any;
 

  constructor(private api: DataService,private dialog: MatDialog,private route:ActivatedRoute){}
  ngOnInit(){
    this.getData();
    this.getCartData();
  }

  getData(){
    this.api.getData().subscribe(
      (data:any)=>{
         this.ProductList = data;
    })
  }

  openDialog(){
    const dialogRef = this.dialog.open(AddDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getData();
    });
  }

  quantity(value:string){
    if(this.productQuantity<8 && value== "max"){
      this.productQuantity +=1;
    }else if(this.productQuantity>1 && value== "min"){
      this.productQuantity -=1;
    }
  }

  getCartData(){
    this.api.getCartData().subscribe(
      (data:any)=>{
        this.cartProducts = data;
        this.cartLength = this.cartProducts.length;
        console.log(data);
      }
    )
  }
}
