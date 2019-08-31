/* tslint:disable:variable-name */
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostBinding,
    Inject,
    Input,
    NgZone,
} from '@angular/core';
import {GM_MARKER_CONTAINER_ACCESSOR, GmMarkerContainerAccessor} from 'nggm';
import {Box} from '../boxes-map.component';
import Color = require('color');
import OverlayView = google.maps.OverlayView;
import Point = google.maps.Point;

const WIDTH = 16;
const HEIGHT = 36;
const BOTTOM_OFFSET = 1;

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'svg[srdBoxMarker]',
    templateUrl: './box-marker.component.html',
    styleUrls: ['./box-marker.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxMarkerComponent extends OverlayView {
    private _elementPosition: Point | null = null;

    @HostBinding('attr.viewBox')
    public readonly viewBox = `0 0 ${WIDTH} ${HEIGHT}`;
    private _worldWidth = 256;

    public constructor(
        @Inject(GM_MARKER_CONTAINER_ACCESSOR)
        container: GmMarkerContainerAccessor,
        private readonly _elementRef: ElementRef<HTMLElement>,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _ngZone: NgZone,
    ) {
        super();
        this.setMap(container);
        // (OverlayView as any).preventMapHitsFrom(_elementRef.nativeElement);
        _elementRef.nativeElement.remove();
    }

    @Input() public readonly srdBoxMarker: Box;

    @HostBinding('style.width.px') public width = 0;

    @HostBinding('style.height.px') public height = 0;

    private _bottomOffset = 0;

    @Input('srdBoxMarkerColor') public color!: Color;

    private _updateSizes(): void {
        let scale: number;

        if (this._worldWidth < 0xc00000) {
            scale = 0.5;
        } else if (this._worldWidth >= 0x6000000) {
            scale = 2;
        } else {
            scale = 1;
        }

        this.width = Math.round(WIDTH * scale);
        this.height = Math.round(HEIGHT * scale);
        this._bottomOffset = Math.round(BOTTOM_OFFSET * scale);
    }

    public onAdd() {
        this.getPanes().overlayMouseTarget.appendChild(
            this._elementRef.nativeElement,
        );
    }

    public onRemove(): void {
        this._elementRef.nativeElement.remove();
    }

    public draw(): void {
        const position = this.srdBoxMarker.position;
        const projection = this.getProjection();

        let fresh = false;

        const worldWidth = projection.getWorldWidth();
        const elementPosition = projection.fromLatLngToDivPixel(position);

        // TODO
        (elementPosition as any).round();

        if (worldWidth !== this._worldWidth) {
            this._worldWidth = worldWidth;
            this._updateSizes();
            fresh = true;
        }

        if (!elementPosition.equals(this._elementPosition)) {
            this._elementPosition = elementPosition;
            fresh = true;
        }

        if (!fresh) {
            return;
        }

        this._ngZone.run(() => {
            this._changeDetectorRef.markForCheck();
        });
    }

    @HostBinding('style.left.px') public get left(): number {
        if (this._elementPosition === null) {
            return 0;
        }

        return this._elementPosition.x - this.width / 2;
    }

    @HostBinding('style.top.px') public get top(): number {
        if (this._elementPosition === null) {
            return 0;
        }

        return this._elementPosition.y - this.height + this._bottomOffset;
    }

    @HostBinding('style.zIndex') public get zIndex(): number {
        return Math.round((90 - this.srdBoxMarker.position.lat()) * 10000);
    }
}
