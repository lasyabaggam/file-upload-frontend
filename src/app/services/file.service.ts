import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import { CommonService } from './common.service';
import { Params } from '../interfaces/params';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  files: BehaviorSubject<any> = new BehaviorSubject([]);
  fileContent: BehaviorSubject<any> = new BehaviorSubject({});
  fileHeaders: BehaviorSubject<any> = new BehaviorSubject([]);
  currentFileData: any = {};
  sortOrder: string = 'asc';
  sortColumn: string = 'id';

  constructor(private apiService: ApiService, private commonService: CommonService) { }

  getFileList(params?: Params): void {
    params = { ...params };
    params.limit = 10;
    this.apiService
      .get('files', { params })
      .subscribe((response) => {
        this.files.next(response);
        if (response.data.length)
          this.fetchFileContent(response.data[0].id);
      });
  }

  fetchFileContent(id: number, params?: Params): void {
    const files = this.files.getValue();
    this.currentFileData = files.data.find((res: any) => res.id === id);
    params = { ...params };
    params.limit = 10;
    this.apiService
      .get(`files/${id}/contents`, { params })
      .subscribe((response) => {
        this.fetchFileHeaders(response.data);
        this.fileContent.next(response)
      });
  }

  uploadFile(file: any): void {
    this.apiService
      .post('upload', file)
      .subscribe((response: any) => {
        this.getFileList();
        if (response) {
          this.fetchFileContent(response.file_id);
          this.commonService.openSnackBar('File uploaded successfully');
        }
      }
      );
  }

  setFileContentParams(options: any) {
    this.fetchFileContent(this.currentFileData.id, options);
  }

  fetchFileHeaders(record: any): void {
    if (record.length)
      this.fileHeaders.next(Object.keys(record[record.length - 1]));
  }

  fetchSortOrder(sortData: string): string {
    if (this.sortColumn === sortData)
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    else {
      this.sortColumn = sortData;
      this.sortOrder = 'asc';
    }
    return `${this.sortColumn}:${this.sortOrder}`;
  }
}
