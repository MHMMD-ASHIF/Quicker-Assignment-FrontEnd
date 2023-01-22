import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
 
  valueOne:any
  valueTwo:any
  

  formGroup!: FormGroup;

  message:boolean=false;
  message_empty:boolean=false;
  
  constructor(private router:Router, private service:SharedService,private http:HttpClient) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      first_name: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }


  password(value:any){
    this.valueOne=value
  }
  c_password(value2:any){
    this.valueTwo=value2
  }
  

  signUpProcess(){
    
   if(this.formGroup.valid){
    if(this.valueOne==this.valueTwo){
      
      this.service.signUp(this.formGroup.value).subscribe(result => {
 
          alert("registered")
          this.router.navigate(['/']) 
        
         
         
      },err=>{
        this.message=false
        this.message_empty=true

      }
      )
    
    }
    else{
      console.log(this.password,this.c_password)
      this.message=true
      this.message_empty=false

    }
   }
   else{
    var msg=`please fill the fields 
        `;
        alert(msg)
   }

    }
    
  
}



