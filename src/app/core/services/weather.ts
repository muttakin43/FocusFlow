import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface WeatherData {
  name: string;
  main: { temp: number; humidity: number; feels_like: number };
  weather: { description: string; icon: string }[];
  wind: { speed: number };
}

@Injectable({
  providedIn: 'root',
})
export class Weather {
  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<WeatherData> {
    const params = new HttpParams()
      .set('q', city)
      .set('appid', environment.weatherApiKey)
      .set('units', 'metric');

    return this.http
      .get<WeatherData>(`${environment.weatherApiUrl}/weather`, { params })
      .pipe(
      catchError(err => {
  console.error('API Error:', err);
  return throwError(() =>
    new Error('Weather fetch failed: ' + err.message)
  );
}))
  }
}
