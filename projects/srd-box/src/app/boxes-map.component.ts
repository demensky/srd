import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {GM_MARKER_OPTIONS} from 'nggm';
import {boxes} from '../data.json';

export interface BoxLiteral {
    readonly name: string;
    readonly position: google.maps.ReadonlyLatLngLiteral;
    readonly section: number;
    readonly client: boolean;
}

export class Box {
    public static deserialize({
        name,
        position,
        section,
        client,
    }: BoxLiteral): Box {
        return new Box(name, new google.maps.LatLng(position), section, client);
    }

    private constructor(
        public readonly name: string,
        public readonly position: google.maps.LatLng,
        public readonly section: number,
        public readonly client: boolean,
    ) {}
}

@Component({
    // tslint:disable-next-line
    selector: 'srd-boxes-map',
    templateUrl: './boxes-map.component.html',
    styleUrls: ['./boxes-map.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: GM_MARKER_OPTIONS,
            useValue: {optimized: true} as google.maps.MarkerOptions,
        },
    ],
})
export class BoxesMapComponent {
    @ViewChild('window', {static: true})
    private readonly _infoWindow!: google.maps.InfoWindow;

    public mapCenter = new google.maps.LatLng(46.9606852, 32.0003433);

    public mapZoom = 12;

    public boxes: readonly Box[] = boxes.map<Box>(Box.deserialize);

    public currentBox: Box | null = null;

    public get boxesIsBig(): boolean {
        return this.mapZoom >= 16;
    }

    public onBoxMarkerClick(box: Box, marker: google.maps.Marker): void {
        this.currentBox = box;
        this._infoWindow.open(undefined, marker);
    }

    public onInfoWindowCloseClick(): void {
        this.currentBox = null;
    }
}
