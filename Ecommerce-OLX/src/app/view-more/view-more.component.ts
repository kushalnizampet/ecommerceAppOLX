import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../config/config';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-more',
  templateUrl: './view-more.component.html',
  styleUrls: ['./view-more.component.scss']
})
export class ViewMoreComponent {
  productQuantity:number=1;
  cartProducts:any;
  productData:any;
  cartLength: any;

  ngOnInit(){
    this.getProduct();
    this.getCartData();
    this.cartLength();
  }

  constructor(private api:DataService,private route:ActivatedRoute,private snackbar : MatSnackBar){}
  quantity(value:string){
    if(this.productQuantity<4  && value== "max"){
      this.productQuantity +=1;
    }else if(this.productQuantity>1 && value== "min"){
      this.productQuantity -=1;
    }
  }

  getProduct(){
    let productId = this.route.snapshot.paramMap.get('id');
    productId && this.api.getProductData(productId).subscribe(
      (data:any)=>{
        this.productData = data;
        console.log(this.productData);
      }
    )
  }

  cartData(itemquantity:number){
  let  id = this.productData?.id;
  let imgUrl = this.productData?.imageUrl;
  let  prodName = this.productData?.productName;
  let  price = this.productData?.price;
  let  brandName = this.productData?.brandName;
  let  quantity = itemquantity;
  let category = this.productData?.category;
  let totalPrice = price* quantity;
  let freshness = this.productData?.freshness;
  let comment = this.productData?.comment;
  let date = this.productData?.dob;
  let seller = this.productData?.seller;
  let location = this.productData?.location;
  let contact = this.productData?.contact;
  let address = this.productData?.Address;
  let pincode = this.productData?.pincode;
  console.log(totalPrice);
  this.addToCartProduct(id,imgUrl!,prodName!,price!,brandName!,quantity!,category!,totalPrice,freshness!,comment!,date!,seller!,location!,contact!,address!,pincode);
  this.snackbar.open('Added to cart successfully', 'ok!', {duration: 2000});
  }

  addToCartProduct(productId:number,productImg:string,productName:string,productPrice:number,productBrand:string,productQuantity:number,productCategory:string,totalCartPrice:number,productFreshness:any,productComment:string,productDate:string,productSeller:string,productLocation:string,productContact:number,productAddress:string,productPincode:number){
    this.cartProducts={
      id: productId,
      imgUrl : productImg,
      prodName : productName,
      price : productPrice,
      brandName: productBrand,
      quantity : productQuantity,
      category : productCategory,
      totalPrice : totalCartPrice,
      freshness : productFreshness,
      Comment : productComment,
      dob : productDate,
      seller : productSeller,
      location : productLocation,
      contact : productContact,
      address : productAddress,
      pincode : productPincode
    }
    console.warn(this.cartProducts);
    this.api.postCartData(this.cartProducts).subscribe(
      (data:any)=>{
        console.log(data);
        this.getCartData(); //updating cart length
      }
    )
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
