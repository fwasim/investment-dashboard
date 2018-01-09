import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../crypto.service';
import { CurrencyPair } from '../currencyPair';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';

@Component({
  selector: 'app-crypto-prices',
  templateUrl: './crypto-prices.component.html',
  styleUrls: ['./crypto-prices.component.css']
})
export class CryptoPricesComponent implements OnInit {

  constructor( private cryptoService: CryptoService ) { }

  // Array of all the currency pairs for which we want to display the corresponding exchange rates
  private currencyPairs: CurrencyPair[] = [{currency1: 'XRP', currency2: 'USD', rate: 0}, {currency1: 'ETH', currency2: 'USD', rate: 0}];

  private intervalTimer: Observable<number> = timer(5000, 5000);  // Creating an observable that will fire every 5 secs after a 5 secs initial delay

  ngOnInit() {
    // Subscribing to the observable will trigger it every 5 secs
    this.intervalTimer.subscribe(() => {
      // Getting prices of all the currencies
      this.getPrices();
    });
  }

  // Get the exchange rate for all currency pairs and update it in the array
  getPrices(): void {
    this.currencyPairs.forEach( currencyPair => { 
      this.cryptoService.getPrice(`${currencyPair.currency1}`, `${currencyPair.currency2}`).subscribe( rateVolArray => {
        currencyPair.rate  = rateVolArray[0]
        console.log(`pair: ${currencyPair.currency1}, ${currencyPair.currency2} rate: ${currencyPair.rate}`);
       })
    }, this)
  }

  addNewPair(newPair: string): void {
    this.currencyPairs.push({
      currency1: newPair.split('/')[0],
      currency2: newPair.split('/')[1],
      rate: 0
    });
  }

  removeCurrencyPair(pair: CurrencyPair): void {
    var index = this.currencyPairs.indexOf(pair);
    this.currencyPairs.splice(index, 1);
  }
}
