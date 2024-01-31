import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  showflag=false;

  onselect(status:string){
    console.log(status);
    this.showflag = true;
  }

}
