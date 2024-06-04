import { Component } from '@angular/core';
import { TableComponent } from '../shared/table/table.component';
import { ListComponent } from '../shared/list/list.component';
import { PaginationComponent } from '../shared/pagination/pagination.component';
import { SearchComponent } from '../shared/search/search.component';
import { FileUploadComponent } from '../shared/file-upload/file-upload.component';
import { NavComponent } from '../shared/nav/nav.component';
import { FileService } from '../services/file.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TableComponent, ListComponent, PaginationComponent, SearchComponent, FileUploadComponent, NavComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(public fileService: FileService) {
  }

  ngOnInit() {
    this.fileService.getFileList();
  }

  fetchFileContent(id: number): void {
    this.fileService.fetchFileContent(id);
  }

  paramsChanged(data: any): void {
    this.fileService.setFileContentParams({...data});
  }

  listParamsChanges(data: any): void {
    this.fileService.getFileList({...data});
  }
}
