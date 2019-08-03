import {
    FullscreenOverlayContainer,
    OverlayContainer,
} from '@angular/cdk/overlay';
import {NgModule} from '@angular/core';
import {MatTooltipModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    GmCommonModule,
    GmInfoWindowModule,
    GmMapModule,
    GmMarkerModule,
} from 'nggm';
import {BoxMarkerComponent} from './box-marker/box-marker.component';
import {BoxesMapComponent} from './boxes-map.component';

@NgModule({
    imports: [
        BrowserModule,
        GmCommonModule,
        GmMarkerModule,
        GmMapModule,
        GmInfoWindowModule,
        BrowserAnimationsModule,
        MatTooltipModule,
    ],
    declarations: [BoxesMapComponent, BoxMarkerComponent],
    providers: [
        {provide: OverlayContainer, useClass: FullscreenOverlayContainer},
    ],
    bootstrap: [BoxesMapComponent],
})
export class BoxSiteModule {}
