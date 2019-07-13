import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {GoogleMapsModule} from '../modules/google-maps/google-maps.module';
import {BoxMarkerDirective} from './box-marker.directive';
import {BoxesMapComponent} from './boxes-map.component';

@NgModule({
    declarations: [BoxesMapComponent, BoxMarkerDirective],
    imports: [BrowserModule, GoogleMapsModule],
    providers: [],
    bootstrap: [BoxesMapComponent],
})
export class BoxSiteModule {}
