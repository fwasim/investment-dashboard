import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, pluck, tap } from 'rxjs/operators';


@Injectable()
export class CryptoService {

	private apiUrl: string = 'https://api.kraken.com/0/public/Ticker';

	// private httpHeaders: HttpHeaders = new HttpHeaders().set()
	private httpParams: HttpParams = new HttpParams();

	constructor(private http: HttpClient) { }

	getPrice(currency1: string, currency2: string): Observable<any> {
		var currencyPairKey = `X${currency1}Z${currency2}`;	// Storing the key for this specific currency pair

		return this.http.get(this.apiUrl, { params: this.httpParams.set('pair', `${currency1}${currency2}`), responseType: 'json' }).pipe(
  		catchError((error: any, caught: Observable<any>): Observable<any> => {
 			console.error(error);
 			console.log(`Getting rate failed: ${error.message}`);
 			return caught;
 		})).pipe(pluck('result')).pipe(pluck(currencyPairKey)).pipe(pluck('c'));
}