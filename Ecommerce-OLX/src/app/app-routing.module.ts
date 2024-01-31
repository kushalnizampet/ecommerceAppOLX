import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { ViewMoreComponent } from './view-more/view-more.component';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { AuthGuard } from './auth.guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"main",component:MainComponent,canActivate:[AuthGuard]},
  {path:"signIn",component:RegistrationComponent},
  {path:"view/:id",component:ViewMoreComponent,canActivate:[AuthGuard]},
  {path:"cart",component:CartComponent,canActivate:[AuthGuard]},
  {path:"contact",component:ContactComponent,canActivate:[AuthGuard]},
  {path:"checkOut",component:CheckoutComponent,canActivate:[AuthGuard]},
  {path:"thank",component:ThankYouComponent,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
