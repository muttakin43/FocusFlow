import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { QuoteService, Quote } from '../../../core/services/quote';

@Component({
  selector: 'app-quote-card',
  standalone: false,
  templateUrl: './quote-card.html',
  styleUrl: './quote-card.scss',
})
export class QuoteCard implements OnInit{
   quote: Quote | null = null;

  constructor(private quoteService: QuoteService,
    private cdr: ChangeDetectorRef
  ) {}

    ngOnInit() {
    this.quoteService.getRandomQuote().subscribe(q => {
      this.quote = q;
      this.cdr.detectChanges();
    });
  }

  refresh() {
    this.quoteService.getRandomQuote().subscribe(q => {
      this.quote = q;
      this.cdr.detectChanges();
    });
  }
}
