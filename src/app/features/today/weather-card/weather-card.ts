import { Component,OnInit,ChangeDetectorRef  } from '@angular/core';
import { Weather, WeatherData } from '../../../core/services/weather';

@Component({
  selector: 'app-weather-card',
  standalone: false,
  templateUrl: './weather-card.html',
  styleUrl: './weather-card.scss',
})
export class WeatherCard implements OnInit{
  weather: WeatherData | null = null;
  loading = true;
  error = false;

  constructor(private weatherService: Weather,
     private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
     this.weatherService.getWeather('Dhaka').subscribe({
     next: (data) => {
        this.weather = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = true;
        this.loading = false;
        this.cdr.detectChanges();
      }
  });
  }
}
