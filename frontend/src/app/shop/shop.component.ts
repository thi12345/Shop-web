import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';
import { error } from 'console';
import { ProductItemComponent } from './product-item/product-item.component';
import { IBrand } from '../shared/models/productBrand';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from '../shared/components/paging-header/paging-header.component';
import { PagerComponent } from '../shared/components/pager/pager.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    CommonModule,
    ProductItemComponent,
    PaginationModule,
    PagingHeaderComponent,
    PagerComponent,
    ProductDetailsComponent
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {
  @ViewChild('search', {static: true}) searchTerm!: ElementRef;
  products!: IProduct[] ;
  brands!: IBrand[];
  types!: IType[];
  shopParams = new ShopParams();
  totalCount!: number ;
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'}
  ];
  constructor(private shopService: ShopService) { }
  ngOnInit(): void {
      // this.shopService.getProducts().subscribe((response) => {
      //   this.products = response.data;
      // }, (error:any) => {
      //   console.log(error);
      // });
      this.getProducts();
      this.getBrands();
      this.getTypes();
  }
  getProducts() {
    this.shopService.getProducts(this.shopParams)
    .subscribe((response) => {
      this.products = response.data;
      this.shopParams.pageNumber = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
      this.totalCount = response.count;
    }, (error:any) => {
      console.log(error);
    });
  }
  getBrands() {
    this.shopService.getBrands().subscribe((response) => {
      this.brands = [{id: 0, name: 'All'}, ...response];
    }, (error:any) => {
      console.log(error);
    });
  }
  getTypes() {
    this.shopService.getTypes().subscribe((response) => {
      this.types = [{id: 0, name: 'All'}, ...response];
    }, (error:any) => {
      console.log(error);
    });
  }

  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onSortSelected(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const sort = selectElement.value;
    this.shopParams.sort = sort;
    this.getProducts();
  }
  onPageChanged(event: any) {
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }

  }
  onSearch(){
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onReset(){
    this.searchTerm.nativeElement.value = "";
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
