import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LogGuard } from './log.guard';
import { ShopListViewComponent } from './shop-list-view/shop-list-view.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {path:'', component:SignInComponent,canActivate:[LogGuard]},

  {path:'shop', component:ShopListViewComponent,canActivate:[AuthGuard]},
  {path:'SignUp', component:SignUpComponent,}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
