import { Component, OnInit } from '@angular/core';
import { QuoteService } from '../../services/quote.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {

  quote:any;
  author:any;

  constructor( private myQuoteService: QuoteService) { }

  ngOnInit() {
  }

  getRandomQuote() {
    this.myQuoteService.getRandom()
    .subscribe((res) => {
      this.quote = res.quote
      this.author = res.author
      });
  }

}
