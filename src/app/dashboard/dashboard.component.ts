import { Component } from '@angular/core';
import { TableComponent } from '../shared/table/table.component';
import { ListComponent } from '../shared/list/list.component';
import { PaginationComponent } from '../shared/pagination/pagination.component';
import { SearchComponent } from '../shared/search/search.component';
import { FileUploadComponent } from '../shared/file-upload/file-upload.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TableComponent, ListComponent, PaginationComponent, SearchComponent, FileUploadComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
