import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  standalone: false,
  templateUrl: './onboarding.html',
  styleUrl: './onboarding.scss',
})
export class Onboarding {

  name = '';

  city = '';

  constructor(
    private router: Router
  ) {}

  saveSetup() {

    localStorage.setItem(
      'focusflow_name',
      this.name
    );

    localStorage.setItem(
      'focusflow_city',
      this.city
    );

    this.router.navigate(
      ['/today']
    );

  }

}
