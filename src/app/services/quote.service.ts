import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class QuoteService {

  constructor(private http: Http) { }

  getRandom() {
    return this.http.get('http://quotes.stormconsultancy.co.uk/random.json')
      .map((res) => res.json());
  }
}
