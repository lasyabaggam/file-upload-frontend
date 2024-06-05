import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { FileService } from '../../services/file.service';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let fileService: FileService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        FileService
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fileService = TestBed.inject(FileService);
    component.records = { data: [] };
    fixture.detectChanges();
  });

  it('should create the table component', () => {
    expect(component).toBeTruthy();
  });

  it('should render table headers based on columns input', () => {
    component.headers = ['product', 'price', 'category', 'color'];
    fixture.detectChanges();
    const headers = fixture.debugElement.queryAll(By.css('th'));
    expect(headers.length).toBe(4);
    expect(headers[0].nativeElement.textContent).toContain('product');
    expect(headers[1].nativeElement.textContent).toContain('price');
    expect(headers[2].nativeElement.textContent).toContain('category');
    expect(headers[3].nativeElement.textContent).toContain('color');
  });

  it('should render table rows based on records input', () => {
    component.headers = ['product', 'price', 'category', 'color'];
    component.records = {
      data: [
        { product: 'Mac', price: 30, category: 'Electronics', color: 'gray' },
        { product: 'HP', price: 30, category: 'Electronics', color: 'white' },
      ]
    };
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(2);
    expect(rows[0].nativeElement.textContent).toContain('Mac');
    expect(rows[0].nativeElement.textContent).toContain('30');
    expect(rows[0].nativeElement.textContent).toContain('Electronics');
    expect(rows[0].nativeElement.textContent).toContain('gray');
    expect(rows[1].nativeElement.textContent).toContain('HP');
    expect(rows[1].nativeElement.textContent).toContain('30');
    expect(rows[1].nativeElement.textContent).toContain('Electronics');
    expect(rows[1].nativeElement.textContent).toContain('white');
  });

  it('should sort the records by the specified column in ascending order', () => {
    component.headers = ['product', 'price', 'category', 'color'];
    component.records = {
      data: [
        { product: 'Mac', price: 30, category: 'Electronics', color: 'gray' },
        { product: 'HP', price: 30, category: 'Electronics', color: 'white' },
      ]
    };
    fixture.detectChanges();

    component.sortData('product');
    expect(component.records.data[0].product).toBe('HP');
    expect(component.records.data[1].product).toBe('Mac');
  });

  it('should sort the records by the specified column in descending order when clicked twice', () => {
    component.headers = ['product', 'price', 'category', 'color'];
    component.records = {
      data: [
        { product: 'Mac', price: 30, category: 'Electronics', color: 'gray' },
        { product: 'HP', price: 30, category: 'Electronics', color: 'white' },
      ]
    };
    fixture.detectChanges();

    component.sortData('product');
    component.sortData('product');
    expect(component.records.data[0].product).toBe('Mac');
    expect(component.records.data[1].product).toBe('HP');
  });

  it('should not render rows if records is empty', () => {
    component.headers = ['product', 'price', 'category', 'color'];
    component.records = {
      data: []
    };
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(0);
  });
});
