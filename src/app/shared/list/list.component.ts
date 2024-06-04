import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'file-list',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  @Output() fetchFileContent: EventEmitter<any> = new EventEmitter();
  @Output() fetchFileList: EventEmitter<any> = new EventEmitter();
  @Input() list: any;

  getFileContent(id: number): void {
    this.fetchFileContent.emit(id);
  }

  pageChange(page: number): void {
    this.fetchFileList.emit(page);
  }
}
