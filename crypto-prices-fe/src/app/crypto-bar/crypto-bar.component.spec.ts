import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoBarComponent } from './crypto-bar.component';

describe('CryptoBarComponent', () => {
  let component: CryptoBarComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [CryptoBarComponent]
    });
    
    component = TestBed.inject(CryptoBarComponent)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
