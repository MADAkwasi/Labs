import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (
  request,
  next
) => {
  const token = localStorage.getItem('authToken') ?? '';
  const router = inject(Router);

  request = request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(request).pipe(
    catchError((error) => {
      if (error.status === 403) {
        localStorage.removeItem('authToken');
        router.navigate(['/login']);
      }
      return throwError(error);
    })
  );
};
