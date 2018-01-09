import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CryptoService } from './crypto.service';
import { HttpClientModule } from '@angular/common/http';
import { CyptoPricesComponent } from './cypto-prices/cypto-prices.component';


@NgModule({
  declarations: [
    AppComponent,
    CyptoPricesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ CryptoService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
