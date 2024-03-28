import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CryptoAggregationComponent } from './crypto-aggregation/crypto-aggregation.component';
import { CryptoTableComponent } from './crypto-table/crypto-table.component';
import { SearchCryptoComponent } from './search-crypto/search-crypto.component';
import { CryptoBarComponent } from './crypto-bar/crypto-bar.component';
import { By } from '@angular/platform-browser';
import { CryptoData } from './shared/modules/crypto.interface';
import { Aggregation } from './crypto-aggregation/modules/aggregation.interface';

describe('CryptoAggregationComponent', () => {
  let component: AppComponent;
  let fetchDataSpy: jest.SpyInstance;
  let cryptoSelectedSpy: jest.SpyInstance;
  let agggregationSelectedSpy: jest.SpyInstance;
  let searchCryptoSpy: jest.SpyInstance;
  let fixture: ComponentFixture<AppComponent>;
  let dataMock: CryptoData;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: []
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fetchDataSpy = jest.spyOn(AppComponent.prototype, 'fetchData')
    cryptoSelectedSpy = jest.spyOn(AppComponent.prototype, 'onCryptoSelected')
    agggregationSelectedSpy = jest.spyOn(AppComponent.prototype, 'onAggregationSelected')
    searchCryptoSpy = jest.spyOn(AppComponent.prototype, 'onInputValueChanged')
    dataMock = {
      id: "bitcoin",
      change: 0.5,
      rank: 1,
      symbol: "BTC",
      name: "Bitcoin",
      supply: 18700000,
      maxSupply: 21000000,
      marketCapUsd: 100000000000,
      volume: 10000000000,
      price: 5000,
      changePercent24Hr: 0.5,
      explorer: "https://blockchain.info/"
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    const table: CryptoTableComponent = fixture.debugElement.query(By.directive(CryptoTableComponent)).componentInstance;
    const search: SearchCryptoComponent = fixture.debugElement.query(By.directive(SearchCryptoComponent)).componentInstance;
    const bar: CryptoBarComponent = fixture.debugElement.query(By.directive(CryptoBarComponent)).componentInstance;
    const aggregation: CryptoAggregationComponent = fixture.debugElement.query(By.directive(CryptoAggregationComponent)).componentInstance;
    expect(table).toBeDefined();
    expect(search).toBeDefined();
    expect(bar).toBeDefined();
    expect(aggregation).toBeDefined(); 
  });

  it('should fetch data when crypto is selected', () => {
    fetchDataSpy.mockClear();
    const table: CryptoTableComponent = fixture.debugElement.query(By.directive(CryptoTableComponent)).componentInstance;
    const bar: CryptoBarComponent = fixture.debugElement.query(By.directive(CryptoBarComponent)).componentInstance;
    table.onRowClick(dataMock);
    expect(cryptoSelectedSpy).toHaveBeenCalled();
    expect(fetchDataSpy).toHaveBeenCalled();
  });

  it('should fetch data when aggregation is changed', () => {
    fetchDataSpy.mockClear();
    const aggregation: CryptoAggregationComponent = fixture.debugElement.query(By.directive(CryptoAggregationComponent)).componentInstance;
    const dayAggregation = Aggregation.DAY;
    component._currentClicked = dataMock;
    aggregation.select(dayAggregation);
    expect(agggregationSelectedSpy).toHaveBeenCalled();
    expect(fetchDataSpy).toHaveBeenCalled();
  });

  it('should change currentSearchValue$ observable on input change', async() => {
    searchCryptoSpy.mockClear();
    const search: SearchCryptoComponent = fixture.debugElement.query(By.directive(SearchCryptoComponent)).componentInstance;
    search.inputValue = "bitcoin";
    search.onInputChange();
    expect(searchCryptoSpy).toHaveBeenCalled();
  });
});
