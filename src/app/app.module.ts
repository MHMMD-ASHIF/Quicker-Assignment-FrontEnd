import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopListViewComponent } from './shop-list-view/shop-list-view.component';
import { ViewComponent } from './shop-list-view/view/view.component';
import { AddEditComponent } from './shop-list-view/add-edit/add-edit.component';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FullViewComponent } from './shop-list-view/full-view/full-view.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';
import { AuthGuard } from './auth.guard';
import { LogGuard } from './log.guard';

const scope = 'https://www.googleapis.com/auth/userinfo.profile'

@NgModule({
  declarations: [
    AppComponent,
    ShopListViewComponent,
    ViewComponent,
    AddEditComponent,
    FullViewComponent,
    SignInComponent,
    SignUpComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    SocialLoginModule
   
    
  ],
  providers: [ AuthGuard,LogGuard,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('1044440262182-72mtu1tuqktmc8b9jv04n5masiafftge.apps.googleusercontent.com'),
            // scope: "https://www.googleapis.com/auth/drive"

          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('484439180551411')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
