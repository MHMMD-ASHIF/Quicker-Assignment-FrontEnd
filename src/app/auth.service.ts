import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


interface myData{
  success: boolean,
  message : string
}

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn')||'false')

  constructor(private http:HttpClient) { }

login():Promise<any>{
  return new Promise((resolve)=>{
    this.loggedInStatus=true
    localStorage.setItem('loggedIn','true')
    resolve(true);
  })
}



get isLoggedIn():boolean{
  return JSON.parse(localStorage.getItem('loggedIn')||this.loggedInStatus.toString())
}

getUserDetails(email:any,password:any){
  return this.http.post<myData>('http://127.0.0.1:8000/login',{
    email,
    password
  })
}


getToken(){
  localStorage.getItem('refresh')
  localStorage.getItem('access')
}




}
