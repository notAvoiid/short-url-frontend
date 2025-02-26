import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';

export interface ShortenResponse {
  shortUrl: string;
  expiresAt: string;
  minutes: number;
}

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  shortenUrl(url: string, minutes: number): Observable<ShortenResponse> {
    return this.http.post<ShortenResponse>(`${this.apiUrl}/shorten`, {
      url,
      minutes
    });
  }

  getOriginalUrl(shortCode: string): Observable<string> {
    return this.http.get(`${this.apiUrl}/${shortCode}`, { responseType: 'text' }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404 || error.status === 410) {
          this.router.navigate(['/expired']); 
        }
        return EMPTY;
      })
    );
  }
}