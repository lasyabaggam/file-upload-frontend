import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

   const token = localStorage.getItem('jwt_token');
   req = req.clone({
     url: req.url,
     setHeaders: {
       Authorization: `Bearer ${token}`,
       Accept: '*/*',
       'Access-Control-Allow-Headers': 'Content-Type',
       'ngrok-skip-browser-warning': 'true',
     },
   });
   return next(req).pipe(tap((resp) => resp));
};
