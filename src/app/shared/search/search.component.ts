import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  @Output() searchTableData: EventEmitter<any> = new EventEmitter();
  searchText: string = '';

  getSearchResults(search: string) {
      this.searchTableData.emit({search: search});
  }
}
