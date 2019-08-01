import {Directive, Inject, Input, OnChanges} from '@angular/core';
import {Box} from './boxes-map.component';

const SIZE_BIG = new google.maps.Size(16, 36);
const SIZE_SMALL = new google.maps.Size(8, 18);
const ANCHOR_BIG = new google.maps.Point(8, 35);
const ANCHOR_SMALL = new google.maps.Point(4, 17);

// @dynamic
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'gm-marker[box]',
})
export class BoxMarkerDirective implements OnChanges {
    @Input() box!: Box;

    @Input() boxIsBig = false;

    public constructor(
        @Inject(google.maps.Marker)
        private readonly
        _marker: google.maps.Marker,
    ) {}

    public ngOnChanges(): void {
        let url = 'assets/box-icon.svg';

        if (!this.box.client /*&& this.boxIsBig*/) {
            url += `#section-${this.box.section}`;
        }

        this._marker.setIcon({
            url,
            scaledSize: this.boxIsBig ? SIZE_BIG : SIZE_SMALL,
            anchor: this.boxIsBig ? ANCHOR_BIG : ANCHOR_SMALL,
        });
    }
}
