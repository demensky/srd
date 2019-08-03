import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {
    MAT_TOOLTIP_DEFAULT_OPTIONS,
    MatTooltipDefaultOptions,
} from '@angular/material';
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
            useValue: {
                // optimized: true
            } as google.maps.MarkerOptions,
        },
        {
            provide: MAT_TOOLTIP_DEFAULT_OPTIONS,
            useValue: {
                position: 'above',
                showDelay: 200,
            } as MatTooltipDefaultOptions,
        },
    ],
})
export class BoxesMapComponent {
    @ViewChild('window', {static: true})
    // tslint:disable-next-line:variable-name
    private readonly _infoWindow!: google.maps.InfoWindow;

    public mapCenter = new google.maps.LatLng(46.9606852, 32.0003433);

    public mapZoom = 12;

    public boxes: readonly Box[] = boxes.map<Box>(Box.deserialize);

    public currentBox: Box | null = null;

    public boxTooltip({name, section, client}: Box): string {
        let result = `${name}/${section}`;

        if (client) {
            result += ' (арендован)';
        }

        return result;
    }
}
