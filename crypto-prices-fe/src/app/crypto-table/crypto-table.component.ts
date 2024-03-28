import { Component, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewChild, inject } from '@angular/core';
import { CryptoData, TimeseriesData, TimeseriesResponse } from '../shared/modules/crypto.interface';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { CryptoFetchTimeseriesService } from '../services/crypto-fetch-timeseries.service';
import { ToastService } from '../services/toast-service.service';

@Component({
  selector: 'app-crypto-table',
  templateUrl: './crypto-table.component.html',
  styleUrl: './crypto-table.component.scss'
})
export class CryptoTableComponent {

  toastService = inject(ToastService);
  cryptoData: CryptoData[] = [];
  checkedRows: CryptoData[] = [];
  displayedData: Observable<CryptoData[]> = new Observable<CryptoData[]>();
  @Input()
  searchCriteria$: Observable<string> = new Observable<string>();
  @Output() cryptoSelected$: EventEmitter<CryptoData[]> = new EventEmitter<CryptoData[]>();
  constructor(private cryptoFetch: CryptoFetchTimeseriesService) {}

  ngOnInit() {
    this.cryptoFetch.getMarketData().pipe(
      switchMap((response: TimeseriesResponse): Observable<CryptoData[]> => {
        const formatted: CryptoData[] = response.data.map((val: TimeseriesData) => {
          return {
            id: val.id,
            name: val.name,
            price: val.priceUsd,
            change: val.changePercent24Hr,
            volume: val.volumeUsd24Hr,
            marketCapUsd: val.marketCapUsd,
            supply: val.supply,
            symbol: val.symbol,
            maxSupply: val.maxSupply,
            rank: val.rank,
            explorer: val.explorer,
            changePercent24Hr: val.changePercent24Hr
          }
        });
        formatted[0].checked = true;
        this.checkedRows.push(formatted[0]);
        this.cryptoSelected$.emit(this.checkedRows);
        return of(formatted);
      }),
      catchError((err, _) => {
        console.error(err);
        return of([]);
      }),
    ).subscribe((data: any) => {
      this.cryptoData = data;
      this.displayedData = of(data);
    });
    this.searchCriteria$.subscribe((searchTerm: string) => {
      if (searchTerm.length === 0) {
        this.displayedData = of(this.cryptoData);
      }
      const filtered = this.cryptoData?.filter((crypto: CryptoData) => crypto.name.toLowerCase().includes(searchTerm));
      this.displayedData = of(filtered);
    });
  }

  showDanger(template: TemplateRef<any>, message: string) {
		this.toastService.show({ template, classname: 'bg-danger text-light', delay: 15000, message: message});
	}

  onRowClick(row: CryptoData) {
    if (row.checked && this.checkedRows.length === 1) {
      return;
    }
    row.checked = !row.checked;
    if (row.checked) {
      this.checkedRows.push(row);
    } else {
      this.checkedRows.splice(this.checkedRows.indexOf(row), 1);
    }
    this.cryptoSelected$.emit(this.checkedRows);
  }

  downloadData() {
    
  }
}
