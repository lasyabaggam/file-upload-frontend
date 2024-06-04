import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { LoginService } from './login.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService: LoginService = inject(LoginService);
  const router: Router = inject(Router);

  return authService.isAuthenticated().pipe(
    tap((status) => {
      if (status)
        return true;
      else {
        router.navigate(['/']);
        return false;
      }
    })
  );
};
