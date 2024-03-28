import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCryptoComponent } from './search-crypto.component';

describe('SearchCryptoComponent', () => {
  let component: SearchCryptoComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [SearchCryptoComponent]
    });
    
    component = TestBed.inject(SearchCryptoComponent)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});