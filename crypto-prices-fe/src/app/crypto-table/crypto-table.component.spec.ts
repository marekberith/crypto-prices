import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { CryptoTableComponent } from './crypto-table.component';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('CryptoTableComponent', () => {
  let fixture: ComponentFixture<CryptoTableComponent>;
  let component: CryptoTableComponent;
  let onRowClickSpy: jest.SpyInstance;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, CommonModule],
      declarations: [CryptoTableComponent]
    });
    
    fixture = TestBed.createComponent(CryptoTableComponent)
    component = fixture.componentInstance;
    onRowClickSpy = jest.spyOn(CryptoTableComponent.prototype, 'onRowClick')
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fill table with data from API', (done) => {
    component.ngOnInit();
    setTimeout(() => {
      expect(component.cryptoData.length).toBe(100);
      expect(component.checkedRows.length).toBe(1);
      expect(component.checkedRows[0].name).toBe(component.cryptoData[0].name);
      done();
    }, 1000); 
  });
});
