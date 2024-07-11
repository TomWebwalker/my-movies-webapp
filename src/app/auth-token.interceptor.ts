import { HttpClient, HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, map, switchMap, tap } from 'rxjs';
import { inject } from '@angular/core';
import { API_URL } from './environment';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const userToken = localStorage.getItem('userToken');
  const modifiedReq = requestWithToken(req, userToken);
  const http = inject(HttpClient);

  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 403) {
        return http.get<{ token: string }>(`${API_URL}/auth/token`).pipe(
          map((response) => response.token),
          tap((token) => localStorage.setItem('userToken', token)),
          switchMap((token) => next(requestWithToken(req, token))),
        );
      }
      return next(modifiedReq);
    }),
  );
};

const requestWithToken = (request: HttpRequest<any>, token: string | null) =>
  request.clone({
    headers: request.headers.set('Authorization', `Bearer ${token}`),
  });
