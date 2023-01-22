import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-full-view',
  templateUrl: './full-view.component.html',
  styleUrls: ['./full-view.component.css']
})
export class FullViewComponent implements OnInit {



  
  constructor(private service: SharedService) { }
  @Input() shop: any;
  ShopId:string | undefined;
  ShopName: string | undefined;
  ShopAddress: string | undefined;
  ShopCity: string | undefined;
  ShopPhone: string | undefined;
  ShopImageName: string | undefined; 
  ShopImagePath: string | undefined;
  shopList: any = [];

  ngOnInit(): void {
    this.loadShopList()
  }


  loadShopList() {
    this.service.getAllShopList().subscribe((data: any) => {
      this.shopList = data;
      this.ShopId = this.shop.id;
      this.ShopName = this.shop.ShopName;
      this.ShopName = this.shop.ShopName;
      this.ShopAddress = this.shop.ShopAddress;
      this.ShopCity = this.shop.ShopCity;
      this.ShopPhone = this.shop.ShopPhone;
      this.ShopImageName = this.shop.ShopImageName;
      this.ShopImagePath=this.service.PhotoUrl+this.ShopImageName;
    })
  }

}
