import { HttpInterceptorFn } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const npxLoader = inject(NgxSpinnerService);
  npxLoader.show();
  return next(req).pipe(finalize(() => npxLoader.hide()));
};