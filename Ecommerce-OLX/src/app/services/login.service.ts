import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { baseUrl } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  invalidUser = new EventEmitter<boolean>
  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get(`${baseUrl}/registration`);
  }

  getUsernameAndPassword(username:any,password:any){
    return this.http.get(`${baseUrl}/registration?username=`+username+"&password="+password);
  }
}
