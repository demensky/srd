import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {
    GmCommonModule,
    GmInfoWindowModule,
    GmMapModule,
    GmMarkerModule,
} from 'nggm';
import {BoxMarkerDirective} from './box-marker.directive';
import {BoxesMapComponent} from './boxes-map.component';

@NgModule({
    imports: [
        BrowserModule,
        GmCommonModule,
        GmMarkerModule,
        GmMapModule,
        GmInfoWindowModule,
    ],
    declarations: [BoxesMapComponent, BoxMarkerDirective],
    providers: [],
    bootstrap: [BoxesMapComponent],
})
export class BoxSiteModule {}
