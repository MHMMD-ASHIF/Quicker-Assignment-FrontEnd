import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})


export class SharedService {
  readonly APIUrl = "http://127.0.0.1:8000/"
  readonly PhotoUrl = "http://127.0.0.1:8000/media/"
  isOnLine:any
  store:any
  private _headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http:HttpClient,private auth:AuthService) { }

  


  getShopList():Observable<any[]>{


    return this.http.get<any[]>(`${this.APIUrl}post/`,);
  }
  addShopList(val:any){
    const token = localStorage.getItem("access");
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.post(`${this.APIUrl}post/`,val,{headers:header});
  }
  updateShopList(id:number,val:any){
    return this.http.put(`${this.APIUrl}post/${id}`,val);
  }
  deleteShopList(val:any){
    return this.http.delete(`${this.APIUrl}post/`+val);
  }
  uploadPhoto(val:any){
    return this.http.post(`${this.APIUrl}saveFile/`,val)
  }
  getAllShopList():Observable<any[]>{
    const token = localStorage.getItem("access");
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
   
    
    return this.http.get<any[]>(`${this.APIUrl}post/`, {headers:header});
  }
  


  
  login(data:any): Observable<any> {
    return this.http.post(`${this.APIUrl}login`,data)
   
    
  }

  signUp(data:any): Observable<any> {

    return this.http.post(`${this.APIUrl}register`,data);
    
  }




 
}
