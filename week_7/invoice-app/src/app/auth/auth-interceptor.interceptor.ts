import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptorInterceptor: HttpInterceptorFn = (
  request,
  next
) => {
  const token = localStorage.getItem('authToken') ?? '';
  request = request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(request);
};
