import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-pager',
  standalone: true,
  imports: [PaginationModule],
  templateUrl: './pager.component.html',
  styleUrl: './pager.component.css'
})
export class PagerComponent implements OnInit {
 @Input() totalCount!: number;
 @Input() pageSize!: number;
  @Input() pageNumber!: number;
  @Output() pageChanged = new EventEmitter<number>();
 constructor() { }
  ngOnInit(): void {  }
  onPagerChanged(event: any) {
    this.pageChanged.emit(event.page);
  }

}
