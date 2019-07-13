import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {GoogleMapsCircleDirective} from './google-maps-circle/google-maps-circle.directive';
import {GoogleMapsMapFullscreenControlDirective} from './google-maps-map/google-maps-map-fullscreen-control.directive';
import {GoogleMapsMapMapTypeControlDirective} from './google-maps-map/google-maps-map-map-type-control.directive';
import {GoogleMapsMapRotateControlDirective} from './google-maps-map/google-maps-map-rotate-control.directive';
import {GoogleMapsMapScaleControlDirective} from './google-maps-map/google-maps-map-scale-control.directive';
import {GoogleMapsMapStreetViewControlDirective} from './google-maps-map/google-maps-map-street-view-control.directive';
import {GoogleMapsMapZoomControlDirective} from './google-maps-map/google-maps-map-zoom-control.directive';
import {GoogleMapsMapComponent} from './google-maps-map/google-maps-map.component';
import {GoogleMapsMarkerDirective} from './google-maps-marker/google-maps-marker.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    GoogleMapsMapComponent,
    GoogleMapsMarkerDirective,
    GoogleMapsCircleDirective,
    GoogleMapsMapMapTypeControlDirective,
    GoogleMapsMapZoomControlDirective,
    GoogleMapsMapScaleControlDirective,
    GoogleMapsMapStreetViewControlDirective,
    GoogleMapsMapRotateControlDirective,
    GoogleMapsMapFullscreenControlDirective,
  ],
  exports: [
    GoogleMapsMapComponent,
    GoogleMapsMarkerDirective,
    GoogleMapsCircleDirective,
    GoogleMapsMapMapTypeControlDirective,
    GoogleMapsMapZoomControlDirective,
    GoogleMapsMapScaleControlDirective,
    GoogleMapsMapStreetViewControlDirective,
    GoogleMapsMapRotateControlDirective,
    GoogleMapsMapFullscreenControlDirective,
  ],
})
export class GoogleMapsModule {}
