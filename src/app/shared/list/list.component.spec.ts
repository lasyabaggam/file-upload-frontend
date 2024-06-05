import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let listElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    component.list = [];
    fixture.detectChanges();
    listElement = fixture.nativeElement;
  });

  it('should create the listcomponent', () => {
    expect(component).toBeTruthy();
  });

  it('should handle item click event', async () => {
    const items = [
      { id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }, { id: 3, name: 'Item 3' }];
    component.list = items;
    fixture.detectChanges();

    spyOn(component, 'getFileContent').and.callThrough();
    await fixture.whenStable();
    const itemElements = listElement.querySelectorAll('.list-item');
    expect(itemElements.length).toBe(items.length);
    fixture.detectChanges();
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (itemElements[i]) {
        debugger
        expect(component.getFileContent(item.id)).toHaveBeenCalled;
        fixture.detectChanges();
      } else {
        fail('Item element not found');
      }
      fixture.detectChanges();
    }
  });
});
