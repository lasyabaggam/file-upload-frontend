import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { CommonService } from '../services/common.service';
import { inject } from '@angular/core';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
    const common = inject(CommonService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.error.code === 401)
        common.openSnackBar(`Invalid login info! Please try again`);
      else if (error.error.code === 500)
        common.openSnackBar(`500 Server Error, Please try again`)
      else{
      console.log('I am here')
        common.openSnackBar(`An error occured, please try again!`)
      }
      return throwError(error);
    })
  );
};
