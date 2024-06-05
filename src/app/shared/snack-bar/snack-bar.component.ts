import { Component, Input } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'snack-bar',
  standalone: true,
  imports: [],
  templateUrl: './snack-bar.component.html',
  styleUrl: './snack-bar.component.scss'
})
export class SnackBarComponent {
  @Input() show: boolean;
  constructor(public commonService: CommonService) {
    
  }

  showSnackBar() {
    setTimeout(() => {
      this.show = true;
    }, 10000);
  }
}
