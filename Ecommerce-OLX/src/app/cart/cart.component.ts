import { Component, Input, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Products, cart } from '../config/config';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  dataSource!: MatTableDataSource<any>;
  productPrice:number = 0;
  CartPrice:number = 0;
  cartProducts:any[] = [];
  cartLength:number = 0;
  cartList!:cart[];
  displayedColumns: string[] = ['id','imgUrl', 'productName', 'price', 'brandName','date','freshness','location','quantity','contact','Address','pincode','seller'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private api:DataService,  private snackBar: MatSnackBar,private dialog: MatDialog,private route: Router) {}
  @Input() cartDataLength:any;
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  ngOnInit(){
    this.getData();
    this.getTotalBill();
  }

  getData(){
    this.api.getCartData().subscribe(
      (data:any)=>{
        this.cartProducts = data;
        this.cartLength = this.cartProducts.length;
        console.log(data);
        this.dataSource = new MatTableDataSource<Products>(this.cartProducts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }

  getTotalBill(){
   this.api.getCartData().subscribe(
    (data:cart[])=>{
       data.forEach(element=>{
          this.CartPrice += element.totalPrice;
          console.log(element.totalPrice)
       })
    }
   )
  }

  //deleteData
  deleteData(id:any,itemrate:number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent,{
      data:{
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'delete',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.api.deleteCartData(id).subscribe(
          (data:any)=>{
            console.log("product deleted");
            this.CartPrice = this.CartPrice - itemrate;
            this.getData();
          },
          (error:any)=>{
            console.warn(error);
          }
        )
        this.snackBar.open("Your Product has been deleted" , "ok",{duration:3000})
      }
      else{
        this.dialog.closeAll()
        this.snackBar.open("Your Product is safe" , "ok",{duration:3000})
      }
    });
  }


}



