import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { LoginService  } from '../services/login.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { Router, provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: LoginService;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [ LoginComponent ],
      providers: [
        { provide: Router, useValue: router },
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService);
    fixture.detectChanges();
  });

  it('should create the login component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with username and password inputs and a login button', () => {
    const usernameInput = fixture.debugElement.query(By.css('input[name="username"]'));
    const passwordInput = fixture.debugElement.query(By.css('input[name="password"]'));
    const loginButton = fixture.debugElement.query(By.css('button[type="submit"]'));

    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(loginButton).toBeTruthy();
  });

  it('should invalidate the form when username and password are empty', () => {
    component.loginForm.controls['username'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should invalidate the form when username is empty', () => {
    component.loginForm.controls['username'].setValue('');
    component.loginForm.controls['password'].setValue('password');
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should invalidate the form when password is empty', () => {
    component.loginForm.controls['username'].setValue('username');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should validate the form when username and password are provided', () => {
    component.loginForm.controls['username'].setValue('validUser');
    component.loginForm.controls['password'].setValue('validPassword');
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should call the login method of LoginService on form submit for valid credentials', () => {
    spyOn(loginService, 'login').and.returnValue(of(true));

    component.loginForm.controls['username'].setValue('validUser');
    component.loginForm.controls['password'].setValue('validPassword');
    component.login();

    expect(loginService.login).toHaveBeenCalledWith('validUser', 'validPassword');
  });

  it('should set an error message on login failure', () => {
    spyOn(loginService, 'login').and.returnValue(throwError({ status: 401 }));

    component.loginForm.controls['username'].setValue('invalidUser');
    component.loginForm.controls['password'].setValue('invalidPassword');
    component.login();

    expect(component.errorMessage).toBe('Invalid username or password');
  });

  it('should navigate to dashboard on successful login', () => {
    spyOn(loginService, 'login').and.returnValue(of(true));
    spyOn(router, 'navigate');
    component.loginForm.controls['username'].setValue('admin');
    component.loginForm.controls['password'].setValue('admin');
    component.login();
    fixture.whenStable().then(() => {
      expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
    });
  });
});
