import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {GoogleMapsMapAttachControlsDirective} from './google-maps-map-attach-controls.directive';
import {GoogleMapsMapControlBottomCenterDirective} from './google-maps-map-control-bottom-center.directive';
import {GoogleMapsMapControlBottomLeftDirective} from './google-maps-map-control-bottom-left.directive';
import {GoogleMapsMapControlBottomRightDirective} from './google-maps-map-control-bottom-right.directive';
import {GoogleMapsMapControlLeftBottomDirective} from './google-maps-map-control-left-bottom.directive';
import {GoogleMapsMapControlLeftCenterDirective} from './google-maps-map-control-left-center.directive';
import {GoogleMapsMapControlLeftTopDirective} from './google-maps-map-control-left-top.directive';
import {GoogleMapsMapControlRightBottomDirective} from './google-maps-map-control-right-bottom.directive';
import {GoogleMapsMapControlRightCenterDirective} from './google-maps-map-control-right-center.directive';
import {GoogleMapsMapControlRightTopDirective} from './google-maps-map-control-right-top.directive';
import {GoogleMapsMapControlTopCenterDirective} from './google-maps-map-control-top-center.directive';
import {GoogleMapsMapControlTopLeftDirective} from './google-maps-map-control-top-left.directive';
import {GoogleMapsMapControlTopRightDirective} from './google-maps-map-control-top-right.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    GoogleMapsMapAttachControlsDirective,
    GoogleMapsMapControlTopLeftDirective,
    GoogleMapsMapControlTopCenterDirective,
    GoogleMapsMapControlTopRightDirective,
    GoogleMapsMapControlLeftCenterDirective,
    GoogleMapsMapControlLeftTopDirective,
    GoogleMapsMapControlLeftBottomDirective,
    GoogleMapsMapControlRightTopDirective,
    GoogleMapsMapControlRightCenterDirective,
    GoogleMapsMapControlRightBottomDirective,
    GoogleMapsMapControlBottomLeftDirective,
    GoogleMapsMapControlBottomCenterDirective,
    GoogleMapsMapControlBottomRightDirective,
  ],
  exports: [
    GoogleMapsMapAttachControlsDirective,
    GoogleMapsMapControlTopLeftDirective,
    GoogleMapsMapControlTopCenterDirective,
    GoogleMapsMapControlTopRightDirective,
    GoogleMapsMapControlLeftCenterDirective,
    GoogleMapsMapControlLeftTopDirective,
    GoogleMapsMapControlLeftBottomDirective,
    GoogleMapsMapControlRightTopDirective,
    GoogleMapsMapControlRightCenterDirective,
    GoogleMapsMapControlRightBottomDirective,
    GoogleMapsMapControlBottomLeftDirective,
    GoogleMapsMapControlBottomCenterDirective,
    GoogleMapsMapControlBottomRightDirective,
  ],
})
export class GoogleMapsMapControlModule {}
