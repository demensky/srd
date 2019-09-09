import {
    FullscreenOverlayContainer,
    OverlayContainer,
} from '@angular/cdk/overlay';
import {NgModule} from '@angular/core';
import {MatTooltipModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {
    GmCommonModule,
    GmControlModule,
    GmInfoWindowModule,
    GmMapModule,
    GmMarkerModule,
} from 'nggm';
import {BoxMarkerComponent} from './box-marker/box-marker.component';
import {BoxesMapComponent} from './boxes-map.component';
import {LightenPipe} from './lighten.pipe';
import {DarkenPipe} from './darken.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        BrowserModule,
        GmCommonModule,
        GmMarkerModule,
        GmMapModule,
        GmInfoWindowModule,
        GmControlModule,
        BrowserAnimationsModule,
        MatTooltipModule,
    ],
    declarations: [
        BoxesMapComponent,
        BoxMarkerComponent,
        LightenPipe,
        DarkenPipe,
    ],
    providers: [
        {provide: OverlayContainer, useClass: FullscreenOverlayContainer},
    ],
    bootstrap: [BoxesMapComponent],
})
export class BoxSiteModule {}
