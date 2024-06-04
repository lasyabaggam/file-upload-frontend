import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'data-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Output() getSortData: EventEmitter<any> = new EventEmitter();
  @Input() records: any;
  @Input() headers: any;

  constructor(private fileService: FileService) {}

  sortData(sortData: string): void {
    this.getSortData.emit({sort: this.fileService.fetchSortOrder(sortData)});
  }
}
