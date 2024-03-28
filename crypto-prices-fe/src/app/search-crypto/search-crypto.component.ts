import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-crypto',
  templateUrl: './search-crypto.component.html',
  styleUrl: './search-crypto.component.scss'
})
export class SearchCryptoComponent {
  @Output() inputValue: any = '';
  @Output() inputValueChanged$: EventEmitter<string> = new EventEmitter<string>();

  onInputChange() {
    this.inputValueChanged$.emit(this.inputValue);
  }
}
