import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: false,
  templateUrl: './timer.html',
  styleUrls: ['./timer.scss']
})
export class Timer {

  minutes = 25;
  seconds = 0;

  private intervalId: any;

  constructor(
    private cdr: ChangeDetectorRef
  ) {}

  startTimer(): void {

    // already running হলে আবার start হবে না
    if (this.intervalId) {
      return;
    }

    this.intervalId = setInterval(() => {

      // timer finished
      if (
        this.minutes === 0 &&
        this.seconds === 0
      ) {

        clearInterval(this.intervalId);
        this.intervalId = null;

        alert('Focus Session Completed!');

        return;
      }

      // minute change
      if (this.seconds === 0) {

        this.minutes--;
        this.seconds = 59;

      } else {

        this.seconds--;

      }

      // UI force update
      this.cdr.detectChanges();

    }, 1000);

  }

  pauseTimer(): void {

    clearInterval(this.intervalId);
    this.intervalId = null;

  }

  resetTimer(): void {

    clearInterval(this.intervalId);
    this.intervalId = null;

    this.minutes = 25;
    this.seconds = 0;

    this.cdr.detectChanges();

  }

}