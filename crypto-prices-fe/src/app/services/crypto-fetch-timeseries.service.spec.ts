import { TestBed } from '@angular/core/testing';
import { CryptoFetchTimeseriesService } from './crypto-fetch-timeseries.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';

describe('CryptoFetchTimeseriesService', () => {
  let service: CryptoFetchTimeseriesService;
  let buildRequestMock: jest.SpyInstance;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [CryptoFetchTimeseriesService]
    });
    buildRequestMock = jest.spyOn(CryptoFetchTimeseriesService.prototype, 'buildRequest')
    service = TestBed.inject(CryptoFetchTimeseriesService)
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should receive response from API', async () => {
    const marketData = await service.getMarketData().toPromise();
    expect(marketData?.timestamp).not.toBeUndefined();
    expect(marketData?.data).not.toBeUndefined();
  });

  it('should receive one series data for BTC', async () => {
    const coin = "bitcoin";
    const limit = 1;
    const request = service.buildRequest(coin, limit);
    expect(request).toBe(`https://api.coincap.io/v2/assets?search=bitcoin&limit=1`);
    const marketData = await service.getMarketData(coin, limit).toPromise();
    expect(marketData?.data.length).toBe(1);
    expect(marketData?.timestamp).toBeDefined();
    expect(marketData?.data[0].id).toBe("bitcoin");
    expect(marketData?.data[0].symbol).toBe("BTC");
    expect(marketData?.data[0].name).toBe("Bitcoin");
  });

  it('should receive no data for unrecognized coin name', async () => {
    const coin = "some-unrecognized-coin-name";
    const limit = 1;
    const request = service.buildRequest(coin, limit);
    expect(request).toBe(`https://api.coincap.io/v2/assets?search=some-unrecognized-coin-name&limit=1`);
    const marketData = await service.getMarketData(coin, limit).toPromise();
    expect(marketData?.data.length).toBe(0);
    expect(marketData?.timestamp).toBeDefined();
  });
  
  it('should handle errors from the API', async () => {
    const coin = 'some-unrecognized-coin-name';

    buildRequestMock.mockReturnValueOnce(`https://api.coincap.io/v2/assets?search=some-unrecognized-coin-name&limit=limit`);
    try {
      await service.getMarketData(coin, 1).toPromise()
      fail('should have thrown an error');
    } catch (error) {
      const httpError = error as HttpErrorResponse;
      expect(httpError).toBeDefined();
      expect(httpError.status).toBe(400);
      expect(httpError.error.error).toBe("invalid query")
    }
  });
});