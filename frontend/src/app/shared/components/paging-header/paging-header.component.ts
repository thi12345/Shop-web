import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
@Component({
  selector: 'app-paging-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paging-header.component.html',
  styleUrl: './paging-header.component.css'
})
export class PagingHeaderComponent implements OnInit {
  @Input() pageNumber!: number;
  @Input() pageSize!: number;
  @Input() totalCount!: number;
  constructor() { }
  ngOnInit(): void {}
}
