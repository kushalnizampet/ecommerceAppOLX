import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  registrationObj={
    firstname:"",
    lastname:"",
    username:"",
    password:""
  }

  constructor(private api: RegistrationService){}
  submitData(){
    this.api.postData(this.registrationObj).subscribe(
      (data:any)=>{
        console.log(data);
        Swal.fire({
          title: "U have registered succesfully!",
          text: "U can now login in to the application",
          icon: "success"
        });
      },
      (error:any)=>{
        console.warn(error);
      }
    )
  }
}
