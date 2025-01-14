import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { INVOICES_API } from '../invoice.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authUrl = INVOICES_API + 'login';
  private readonly http = inject(HttpClient);

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return false;
    }

    return true;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.authUrl, { username, password }).pipe(
      tap((response) => {
        if (response?.token) {
          localStorage.setItem('authToken', response.token);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }
}
