import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeseriesResponse } from '../shared/modules/crypto.interface';

@Injectable({
  providedIn: 'root'
})
export class CryptoFetchTimeseriesService {
  constructor(private http: HttpClient) { }

  getData(days: number, coin: string) {
    const params = {
      vs_currency: 'usd',
      days: days.toString()
    };
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/${coin.toLowerCase().replaceAll(" ", "_")}/market_chart`, { params });
  }

  buildRequest(search?: string, limit?: number) {
    let url = 'https://api.coincap.io/v2/assets';
    // append to url search and limit if they are defined
    if (search) {
      url += `?search=${search}`;
    }
    if (limit) {
      if (search)
        url += `&limit=${limit}`;
      else  
        url += `?limit=${limit}`;
    }
    return url;
  }

  getMarketData(search?: string, limit?: number): Observable<TimeseriesResponse> {
    const url = this.buildRequest(search, limit);
    return this.http.get<TimeseriesResponse>(url);
  }
}
