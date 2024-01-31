import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from './services/data.service';
import {ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Products } from './config/config';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crudUsingReactiveForms';
  ProductList!:Products[];
  displayedColumns: string[] = ['id','productName','imageUrl', 'category','brandName','dob','freshness','price','comment','seller','location','contact','quantity','Address','pincode','a'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog,private api:DataService) {}
 
  ngOnInit() {
    this.getData();
  }

  getData(){
    this.api.getData().subscribe((data:any)=>{
      console.log(data);
      this.ProductList = data;
      
      this.dataSource = new MatTableDataSource<Products>(this.ProductList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    })
  }

  deleteData(id:any){
    this.api.deleteData(id).subscribe(
      (data:any)=>{
        this.getData();
      },
      (error:any)=>{
        console.log(error);
      }
    )
  }

  applyFilter(data:Event){
    const value = (data.target as HTMLInputElement).value;
    if (value.length>=3){
      this.dataSource.filter = value;
    }else{
      this.getData();
    }
  }
}

