import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
 isBrowser: boolean;
 constructor(@Inject(PLATFORM_ID) private platformId: Object){
  this.isBrowser = isPlatformBrowser(this.platformId)
 }
}
