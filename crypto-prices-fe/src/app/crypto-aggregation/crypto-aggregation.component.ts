import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Aggregation } from './modules/aggregation.interface';

@Component({
  selector: 'app-crypto-aggregation',
  templateUrl: './crypto-aggregation.component.html',
  styleUrl: './crypto-aggregation.component.scss'
})
export class CryptoAggregationComponent {
  isDropdownOpen: boolean = false;
  selectedAggregation: Aggregation = Aggregation.WEEK;
  aggregationOptions = Object.values(Aggregation).filter(val => typeof(val) != "string");
  @Output() aggregationSelected$: EventEmitter<Aggregation> = new EventEmitter<Aggregation>();
  
  select(option: any) {
    this.selectedAggregation = option;
    this.aggregationSelected$.emit(option);
  }

  selected(option: any) {
    return this.selectedAggregation === option;
  }

  getAggregationWithOption(option: any) {
    return Aggregation[option];
  }
}
