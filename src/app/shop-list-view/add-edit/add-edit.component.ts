import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {



  constructor(private service: SharedService) { }


  @Input() shop: any;
  ShopName: string | undefined;
  ShopAddress: string | undefined;
  ShopCity: string | undefined;
  ShopPhone: string | undefined;
  ShopImageName: string | undefined; 
  ShopImagePath: string | undefined;
  shopList: any = [];

  ngOnInit(): void {
    this.loadShopList();
  }
  

  loadShopList() {
    this.service.getAllShopList().subscribe((data: any) => {
      this.shopList = data;
      this.ShopName = this.shop.ShopName;
      this.ShopAddress = this.shop.ShopAddress;
      this.ShopCity = this.shop.ShopCity;
      this.ShopPhone = this.shop.ShopPhone;
      this.ShopImageName = this.shop.ShopImageName;
      this.ShopImagePath=this.service.PhotoUrl+this.ShopImageName;
    })
  }
  addShop() {
    var val = {
      ShopName: this.ShopName,
      ShopAddress: this.ShopAddress,
      ShopCity: this.ShopCity,
      ShopPhone: this.ShopPhone,
      ShopImageName: this.ShopImageName
    };
    this.service.addShopList(val).subscribe(res => {
      alert('Shop Added Successfully!!');
      window.location.reload();

    })

  }
  updateShop() {
    var id = this.shop.id
    var val = {
      ShopName: this.ShopName,
      ShopAddress: this.ShopAddress,
      ShopCity: this.ShopCity,
      ShopPhone: this.ShopPhone,
      ShopImageName: this.ShopImageName
    };
    this.service.updateShopList(id, val).subscribe(res => {
      alert('Shop Updated Successfully!!');
      window.location.reload();
      
    })


  }


  

  uploadPhoto(event:any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);
    this.service.uploadPhoto(formData).subscribe((data:any)=>{
      this.ShopImageName=data.toString();
      this.ShopImagePath=this.service.PhotoUrl+this.ShopImageName;
      
    })
  }


}

