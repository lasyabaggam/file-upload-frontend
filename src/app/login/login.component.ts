import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userdata : User = {
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  }
  hide = true;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private commonService: CommonService
  ) {}

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  login(): void {
    if (!this.userdata.username || !this.userdata.password) return;
    const username = this.commonService.modifyReqValue(this.userdata.username.value);
    const password = this.commonService.modifyReqValue(this.userdata.password.value);
    this.loginService.login(username, password).subscribe((response) => {
      if (response.token) this.router.navigate(['/dashboard']);
    });
  }
}
