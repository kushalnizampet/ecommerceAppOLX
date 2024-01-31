export const baseUrl = "http://localhost:3000";

export interface Products{
    id:number;
    productName:string;
    category:string;
    freshness:string;
    price:number;
    comment:string;
    date:string;
    seller:string;
    location:string;
    quantity:number;
    contact:number;
    Address:string;
    pincode:number;
    brandName:string;
    imageUrl:string;
    totalPrice:number;
}
export interface cart{
    id: number;
    brandName:string;
    imageUrl:string;
    totalPrice:number;
    quantity:number;
    price:number;
    productID:number;
}