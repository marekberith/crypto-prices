import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ReplaySubject, catchError, of, takeUntil } from 'rxjs';
import { Aggregation } from './crypto-aggregation/modules/aggregation.interface';
import { CryptoData } from './shared/modules/crypto.interface';
import { AppModule } from './app.module';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CryptoFetchTimeseriesService } from './services/crypto-fetch-timeseries.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CryptoTableComponent } from './crypto-table/crypto-table.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsContainer } from './toast-container/toast-container.component';
import { ToastService } from './services/toast-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AppModule, NgxChartsModule, NgbTooltipModule, ToastsContainer],
  providers: [CryptoFetchTimeseriesService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(CryptoTableComponent) table: CryptoTableComponent | undefined;
  @ViewChild("dangerTpl") dangerTpl!: TemplateRef<any>;

  isDarkMode: boolean = true;
  _chartData: any[] = [];
  _currentClicked: CryptoData | undefined;
  _aggregation: Aggregation | undefined = Aggregation.WEEK;
  news: any;

  currentClicked$: ReplaySubject<any> = new ReplaySubject<any>();
  currentSearchValue$: ReplaySubject<string> = new ReplaySubject<string>();
  destroy$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  data$ = new ReplaySubject(1);
  failedLogs: string[] = [];
  constructor(private crypto: CryptoFetchTimeseriesService,
    private toastService: ToastService) {
  }

	showDanger(template: TemplateRef<any>, message: string) {
		// this.toastService.show({ template, classname: 'bg-danger text-light', delay: 15000, message: message});
	}

  onInputValueChanged(event: string) {
    this.currentSearchValue$.next(event);
  }

  onCryptoSelected(event: CryptoData[], errTemplate?: TemplateRef<any>) {
    this.currentClicked$.next(event[event.length - 1]);
    this._currentClicked = event[event.length - 1];
    this.fetchData(event.map(v => v.id), errTemplate)
  }

  onAggregationSelected(event: Aggregation, errTemplate?: TemplateRef<any>) {
    this._aggregation = event;
    if (this._currentClicked) {
      this.currentClicked$ = this.currentClicked$;
      this.fetchData([this._currentClicked.id], errTemplate);
    }
  }

  fetchData(clickedData: string[], errTemplate?: TemplateRef<any>) {
    this._chartData = [];
    clickedData.forEach((clicked: string) => {

      if (clicked) {
        this.crypto.getData(this._aggregation as number, clicked)
        .pipe(
          takeUntil(this.destroy$),
          catchError((err: Error, _) => {
            if (errTemplate) {
              this.showDanger(errTemplate, (err as Error).message);
            } else {
              console.log(err);
            }
            return of([]);
          })
        )
        .subscribe((data: any) => {
          const formatted: any = {
            name: clicked,
            series: data.prices.map((price: any) => ({
              name: new Date(price[0]),
              value: price[1]
            }))
          }
          
          this._chartData.push(formatted);
          if (this._chartData.length == clickedData.length) {
            this.data$.next(this._chartData);
          }
        });
      }
    });

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
