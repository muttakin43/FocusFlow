import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Holiday {
  date: string;
  localName: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class HolidayService {
  constructor(private http: HttpClient) {}

  private bdHolidays: Holiday[] = [
    { date: '2026-02-21', localName: 'ভাষা শহীদ দিবস',  name: 'Language Martyrs Day' },
    { date: '2026-03-17', localName: 'জাতির পিতার জন্মদিন', name: 'Birth of Father of the Nation' },
    { date: '2026-03-26', localName: 'স্বাধীনতা দিবস',  name: 'Independence Day' },
    { date: '2026-04-14', localName: 'পহেলা বৈশাখ',     name: 'Bengali New Year' },
    { date: '2026-05-01', localName: 'মে দিবস',          name: 'Labour Day' },
    { date: '2026-08-15', localName: 'জাতীয় শোক দিবস', name: 'National Mourning Day' },
    { date: '2026-12-16', localName: 'বিজয় দিবস',       name: 'Victory Day' },
     // আজকের date — test এর জন্য
  ];

  getHolidaysForYear(countryCode: string, year: number): Observable<Holiday[]> {
    if (countryCode === 'BD') {
      return of(this.bdHolidays);
    }
    return this.http
      .get<Holiday[]>(`${environment.holidayApiUrl}/PublicHolidays/${year}/${countryCode}`)
      .pipe(catchError(() => of([])));
  }

  getTodayHoliday(holidays: Holiday[]): Holiday | undefined {
    const today = new Date().toISOString().split('T')[0];
    return holidays.find(h => h.date === today);
  }
}
