import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  postData(data:any){
    return this.http.post(`${baseUrl}/registration`,data);
  }

  getData(){
    return this.http.get(`${baseUrl}/registration`);

  }
}
