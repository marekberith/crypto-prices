import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CryptoAggregationComponent } from "./crypto-aggregation/crypto-aggregation.component";
import { CryptoBarComponent } from "./crypto-bar/crypto-bar.component";
import { CryptoTableComponent } from "./crypto-table/crypto-table.component";
import { SearchCryptoComponent } from "./search-crypto/search-crypto.component";
import { CryptoFetchTimeseriesService } from "./services/crypto-fetch-timeseries.service";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { NgbPopoverModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastsContainer } from "./toast-container/toast-container.component";

@NgModule({
    imports: [FormsModule, RouterModule, HttpClientModule, CommonModule, NgbPopoverModule, NgbTooltipModule, ToastsContainer],
    declarations: [CryptoAggregationComponent, CryptoBarComponent, CryptoTableComponent, SearchCryptoComponent],
    exports: [CryptoAggregationComponent, CryptoBarComponent, CryptoTableComponent, SearchCryptoComponent],
    providers: [CryptoFetchTimeseriesService]
})
export class AppModule { }  