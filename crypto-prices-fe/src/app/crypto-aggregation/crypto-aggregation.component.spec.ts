import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoAggregationComponent } from './crypto-aggregation.component';
import { HttpClientModule } from '@angular/common/http';

describe('CryptoAggregationComponent', () => {
  let component: CryptoAggregationComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [CryptoAggregationComponent]
    });
    
    component = TestBed.inject(CryptoAggregationComponent)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
