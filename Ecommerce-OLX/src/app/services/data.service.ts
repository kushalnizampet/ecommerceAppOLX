import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products, baseUrl, cart } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }
  postData(data:any){
    return this.http.post<any>(`${baseUrl}/productList`,data);
  }

  getData(){
    return this.http.get(`${baseUrl}/productList`);
  }

  deleteData(id:any){
    return this.http.delete(`${baseUrl}/productList/`+id);
  }

  getProductData(id:any){
    return this.http.get<Products[ ]>(`${baseUrl}/productList/${id}`);
  }

  postCartData(data:any){
    return this.http.post<any>(`${baseUrl}/cart`,data);
  }
  getCartData(){
    return this.http.get<cart[]>(`${baseUrl}/cart`);
  }
  deleteCartData(id:any){
    return this.http.delete(`${baseUrl}/cart/`+id);
  }

}
