import { Component, OnInit } from '@angular/core';
import { HolidayService, Holiday } from '../../../core/services/holiday';

@Component({
  selector: 'app-topbar',
  standalone: false,
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class Topbar implements OnInit {

  today = new Date();
  isDarkMode = true;
  todayHoliday: Holiday | undefined;

  constructor(
    private holidayService: HolidayService
  ) {}

  ngOnInit() {

    // Theme Restore

    const savedTheme = localStorage.getItem('theme');

    document.body.classList.remove(
      'dark-theme',
      'light-theme'
    );

    if (savedTheme === 'light') {

      this.isDarkMode = false;
      document.body.classList.add('light-theme');

    } else {

      this.isDarkMode = true;
      document.body.classList.add('dark-theme');

    }

    // Holiday Logic

    const year = this.today.getFullYear();

    this.holidayService
      .getHolidaysForYear('BD', year)
      .subscribe(holidays => {

        this.todayHoliday =
          this.holidayService.getTodayHoliday(holidays);

      });

  }

  toggleTheme() {

    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {

      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');

      localStorage.setItem('theme', 'dark');

    } else {

      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');

      localStorage.setItem('theme', 'light');

    }

  }

}