import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() pageData: any;
  @Output() pageChanged: EventEmitter<any> = new EventEmitter();


  changePage(pageNumber: number) {
    this.pageChanged.emit({page: pageNumber});
  }
}
