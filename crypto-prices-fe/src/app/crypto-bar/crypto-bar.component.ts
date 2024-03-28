import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoData } from '../shared/modules/crypto.interface';

@Component({
  selector: 'app-crypto-bar',
  templateUrl: './crypto-bar.component.html',
  styleUrl: './crypto-bar.component.scss'
})
export class CryptoBarComponent {
  @Input()
  public set _item(item: CryptoData | null) {
    if (item) {
      this.item = item;
    }
  }
  item: CryptoData = {name: "", id: "", price: 0, change: 0, volume: 0, marketCapUsd: 0, supply: 0, symbol: "", maxSupply: 0, rank: 0, explorer: "", changePercent24Hr: 0};

  constructor() {

  }

}
