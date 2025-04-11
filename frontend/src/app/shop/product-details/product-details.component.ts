import { ShopService } from './../shop.service';
import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../shared/models/product';
import { response } from 'express';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],

  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product!: IProduct;

  constructor(private shopService: ShopService,
    private activateRoute: ActivatedRoute,
    private bcService: BreadcrumbService
  ){}
  ngOnInit(): void {
    this.loadProduct();
  }
  loadProduct(){
    const id = Number(this.activateRoute.snapshot.paramMap.get('id'));
    if (!id) return;
    this.shopService.getProduct(id)
      .subscribe(response => {
        this.product = response;
        this.bcService.set('@productDetails', this.product.name)
        
      }, (error:any) =>{
        console.log(error);
      }
  );
  }
}
