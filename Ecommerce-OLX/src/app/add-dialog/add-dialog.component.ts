import { Component } from '@angular/core';
import { FormGroup,FormBuilder,Validators, MaxLengthValidator } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../services/data.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent {

  freshnessList=["BrandNew","Second Hand","Refurbished"];
  productForm !: FormGroup;
  cDateAndTime: any;
  cartProducts: any;
  cartLength: any;
  
  constructor(private formBuilder : FormBuilder, private api: DataService, private dialogRef: MatDialogRef<AddDialogComponent>,private datePipe:DatePipe,private snackbar : MatSnackBar){}

  ngOnInit(): void{
    this.productForm = this.formBuilder.group({
      productName : ['',Validators.required],
      category : ['',Validators.required],
      freshness : ['',Validators.required],
      price : ['',Validators.required,],
      comment : ['',Validators.required],
      // date : ['',Validators.required],
      seller : ['',Validators.required],
      location : ['',Validators.required],
      quantity : ['',Validators.required],
      contact : ['',Validators.required],
      Address: ['',Validators.required],
      pincode: ['',Validators.required],
      brandName: ['',Validators.required],
      // a: ['',Validators.required]
      imageUrl: ['',Validators.required]
    })
    this.getDate();
    this.getProductData();
  }

  getProductData(){
    this.api.getData().subscribe(
      (data:any)=>{
        console.log(data);
      }
    )
  }
  getDate(){
    this.cDateAndTime = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
  }
 
  newEmpdata:any
 
  EmployeeData(prodName:string,category:string,fresh:string,pr:number,co:string,sell:string,loc:string,con:number,add:string,pin:number,brand:string,img:string){
    ////////////////////////////it checks fields and goes down ///////////////////////////
    this.newEmpdata={
        productName:prodName,
        category:category,
        dob:this.cDateAndTime,
        freshness:fresh,
        price:pr,
        comment:co,
        seller:sell,
        location:loc,
        // quantity:quan,
        contact:con,
        Address:add,
        pincode:pin,
        brandName:brand,
        imageUrl:img
      }
      ////////////////////////Here the data will be submitted in respective fields ///////////////////
     console.log(this.newEmpdata)
     this.api.postData(this.newEmpdata).subscribe(
      (data:any)=>{
        console.log(data);
        this.getProductData();
      }
     )
  }

  onFormSubmit(){
      //////////////After clicking submit it redirects to onform submit and checks that every field is not empty/////////////
     if(this.productForm.value.productName!=""&&this.productForm.value.category!=""&&this.productForm.value.freshness!=""&&this.productForm.value.price!=""&&this.productForm.value.comment!=""&&this.productForm.value.seller!=""&&this.productForm.value.location!=""&&this.productForm.value.contact!="",this.productForm.value.Address!="",this.productForm.value.pincode!="",this.productForm.value.brandName!="",this.productForm.value.imageUrl!=""){
      //////////////After checking the fields it redirects to employee data function//////////////
      this.EmployeeData(this.productForm.value.productName,this.productForm.value.category,this.productForm.value.freshness,this.productForm.value.price,this.productForm.value.comment,this.productForm.value.seller,this.productForm.value.location,this.productForm.value.contact,this.productForm.value.Address,this.productForm.value.pincode,this.productForm.value.brandName,this.productForm.value.imageUrl)
      this.snackbar.open("Your Product has been added" , "ok",{duration:3000})
     }
     else{
      this.snackbar.open("enter details" , "ok",{duration:3000})
     }
  }

  getData(){
    this.api.getCartData().subscribe(
      (data:any)=>{
        this.cartProducts = data;
        this.cartLength = this.cartProducts.length
        console.log(data);
      }
    )
  }

}
