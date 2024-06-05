import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { SnackBarComponent } from './shared/snack-bar/snack-bar.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SnackBarComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  constructor(public commonService: CommonService) {}
  
  ngOnIt(): void {
    initFlowbite();
  }
}
