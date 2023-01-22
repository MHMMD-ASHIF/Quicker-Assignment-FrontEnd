import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { Subject } from 'rxjs';
import { AuthService } from '../auth.service';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient, HttpHeaders } from '@angular/common/http';




@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})



export class SignInComponent implements OnInit {
  formGroup!: FormGroup;
  user!: SocialUser;
  loggedIn: any;
  log = false


  private unsubscriber: Subject<void> = new Subject<void>();
  private client_id = "dIRu3MGsNywjsBV9Yd1cp1oC6E8J4tnSmstH1mwg"
  private client_secret = "AgNAlGnHboJan1bIZ9RQewR40jka6xAvNiYLpbBCa1uw6AV6fXy3jwkBgD3vZAorDccCq4wVG0dlN1qpZdMB8Mi7jhFNJtdK73hhofKxEljiPk2AMVQk9IiiS868VVkq"
  auth_token: any
  google_token: any

  constructor(private router: Router, private service: SharedService, private auth: AuthService, private authService: SocialAuthService, private http: HttpClient) {



  }

  message: boolean = false;
  message_empty: boolean = false;
  ngOnInit(): void {


    this.authService.authState.subscribe((user) => {

      this.auth_token = user.authToken
      this.google_token = user.idToken
      this.loggedIn = (user != null);



    })


    this.initForm();

  }




  signUpFacebook() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((res) => {
      this.http.post<any>('http://127.0.0.1:8000/auth/convert-token', {
        token: this.auth_token, backend: 'facebook', grant_type: 'convert_token',
        client_id: this.client_id, client_secret: this.client_secret
      }).subscribe(user => {
        localStorage.setItem('access', user.access_token);
        localStorage.setItem('refresh', user.refresh_token);
        localStorage.setItem('loggedIn', 'true')
        this.router.navigate(['/shop'])
      })
    })

  }


  googleSignIn() {


    this.http.post<any>('http://127.0.0.1:8000/auth/convert-token', {
      token: this.google_token, backend: 'google-oauth2', grant_type: 'convert_token',
      client_id: this.client_id, client_secret: this.client_secret
    }).subscribe(user => {
      localStorage.setItem('access', user.access_token);
      localStorage.setItem('refresh', user.refresh_token);
      localStorage.setItem('loggedIn', 'true')
      this.router.navigate(['/shop'])
    })




  }





  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })

  }



  loginProcess() {


    if (this.formGroup.valid) {
      this.service.login(this.formGroup.value).subscribe(result => {
        if (result.success) {
          this.auth.login().then(() => {
            localStorage.setItem("access", result.user.tokens.access);
            localStorage.setItem("refresh", result.user.tokens.refresh);
            if (localStorage.getItem('refresh')) {
              this.router.navigate(['/shop'])
              console.log(result)
            }
          })
        } else {
          this.message = true;
          this.message_empty = false
        }
      })
    }
    else {
      this.message_empty = true
      this.message = false
    }

  }





}
