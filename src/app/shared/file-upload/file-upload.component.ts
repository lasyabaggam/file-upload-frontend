import { Component } from '@angular/core';
import { FileService } from '../../services/file.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'file-upload',
  standalone: true,
  imports: [],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  file: File;

  constructor(
    private fileService: FileService,
    private commonService: CommonService
  ) { }

  onUpload(event: any): void {
    this.file = event.target.files[0];
    if (this.file && this.file.type.includes('csv')) {
      const formData = new FormData();
      formData.append('file', this.file, this.file.name);
      this.fileService.uploadFile(formData);
    } else this.commonService.openSnackBar('Invalid File Format');
  }
}
