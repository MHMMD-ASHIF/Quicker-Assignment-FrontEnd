import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { fromEvent, takeUntil, Subject} from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css',
        ]
})
export class ViewComponent implements OnInit {
  user!:SocialUser;
  loggedIn:any;



  private unsubscribed : Subject<void> = new Subject<void>();

  POSTS:any;
  page:number=1;
  count:number=0;
  tableSize:number=6;
  tableSizes:any=[5,10,15,20];
  constructor(private service:SharedService, private router:Router, private auth:AuthService,private authService:SocialAuthService,private http:HttpClient) { 
  }
  
  ShopList:any=[];

  ModalTitle : string | undefined;
  ActivateAddEditDepComp:boolean=false;
  ActivateShop:boolean=false;
  shop:any;
  shopDet:any;

  ShopIdFilter:string="";
  ShopNameFilter:string="";
  ShopListWithoutFilter:any=[];
  dataFormService:any;

  ngOnInit(): void {

     
    this.refreshShopList();
    

  }

  postList():void{

    this.service.getAllShopList().subscribe((response)=>{
      this.POSTS=response;
      
     
    }
   )
  }

  onTableDataChange(event:any){
    this.page = event;
    this.postList();
   }
   onTableSizeChange(event:any):void{
    this.tableSize = event.target.value;
    this.page = 1;
    this.postList();
   }



  addClick(){
    this.shop={
      ShopName:"",
      ShopAddress:"",
      ShopCity:"",
      ShopPhone:"",
      ShopImageName:"Anonymous.jpg"

    }
    this.ModalTitle="Add Shop";
    this.ActivateAddEditDepComp=true;
  }
  View(items:any){
    this.shopDet=items;
    this.ModalTitle="Shop Details";
    this.ActivateShop=true;

  }
   
    
  
  closeClick(){
    this.refreshShopList();
    this.ActivateAddEditDepComp=false;
    this.ActivateShop=false;
  }
 
  logoutUser(){
  
    localStorage.clear()
      this.router.navigate(['/'])
  }
  edit(item:any){
    this.shop=item;
    this.ModalTitle="Edit Shop"
    this.ActivateAddEditDepComp=true;
  }

  delete(item:any){
    this.shop=item;
    if(confirm('Are you Sure ?')){
      this.service.deleteShopList(item.id).subscribe(data=>{
        
        alert('Deleted Successfully!!');
        this.refreshShopList();
      })
    }

  }
  refreshShopList(){

    this.service.getAllShopList().subscribe((response)=>{
      this.POSTS=response.sort((a,b)=>a.id-b.id);
      this.ShopListWithoutFilter=response;
    });
  }

 



  FilterFn(){
    var ShopIdFilter = this.ShopIdFilter;
    var ShopNameFilter = this.ShopNameFilter;

    this.POSTS = this.ShopListWithoutFilter.filter(function (el:any){
        return el.id.toString().toLowerCase().includes(
          ShopIdFilter.toString().trim().toLowerCase()
        )&&
        el.ShopName.toString().toLowerCase().includes(
          ShopNameFilter.toString().trim().toLowerCase()
        )
    });
  }


}
