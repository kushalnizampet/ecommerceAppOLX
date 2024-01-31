import { Component, ViewChild } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('loginform',{static:true}) loginform!:NgForm;
  
  loginObj={
    username:'',
    password:''
  }
  constructor(private api:LoginService,private route:Router,private snackbar :MatSnackBar){}
  loginData(){
    this.api.getUsernameAndPassword(this.loginObj.username,this.loginObj.password).subscribe(
      (data:any)=>{
        console.log(data);
        if(data.length>0){
          this.api.invalidUser.emit(false);
          this.route.navigateByUrl('/main');
          localStorage.setItem("logindata",JSON.stringify(data));
          this.snackbar.open("You are logged in successfully","ok",{duration:3000})
        }else{
          this.api.invalidUser.emit(true);
          this.api.invalidUser.subscribe(
            (result)=>{
              if(result){
                this.snackbar.open("Enter ur credentials correctly","ok",{duration:3000});
              }}
          )
        }
      },
      (error:any)=>{
        console.warn(error);
      }
    )
  }
  
}


