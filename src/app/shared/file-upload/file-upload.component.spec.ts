// file-upload.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileUploadComponent } from './file-upload.component';
import { FileService } from '../../services/file.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;
  let fileService: FileService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fileService = TestBed.inject(FileService);
    fixture.detectChanges();
  });

  it('should create file upload component', () => {
    expect(component).toBeTruthy();
  });

  it('should call upload file method when file input changes', () => {
    const csvFile = new File(['name,age\nJohn,30'], 'test.csv', { type: 'text/csv' });
    const inputElement = fixture.nativeElement.querySelector('input[type=file]');

    const inputEvent = new Event('change');
    Object.defineProperty(inputEvent, 'target', { writable: true, value: { files: [csvFile] } });
    inputElement.dispatchEvent(inputEvent);
    fixture.detectChanges();

    expect(component.file).toEqual(csvFile);
  });
});
