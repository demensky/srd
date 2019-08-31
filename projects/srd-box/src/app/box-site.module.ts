import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {
    GmCommonModule, GmControlModule,
    GmInfoWindowModule,
    GmMapModule,
    GmMarkerModule,
} from 'nggm';
import {BoxMarkerComponent} from './box-marker/box-marker.component';
import {BoxesMapComponent} from './boxes-map.component';
import { LightenPipe } from './lighten.pipe';
import { DarkenPipe } from './darken.pipe';

@NgModule({
    imports: [
        BrowserModule,
        GmCommonModule,
        GmMarkerModule,
        GmMapModule,
        GmInfoWindowModule,
        GmControlModule,
    ],
    declarations: [BoxesMapComponent, BoxMarkerComponent, LightenPipe, DarkenPipe],
    providers: [],
    bootstrap: [BoxesMapComponent],
})
export class BoxSiteModule {}
