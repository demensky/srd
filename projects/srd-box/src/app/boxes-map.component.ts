import {ChangeDetectionStrategy, Component} from '@angular/core';
import {boxes} from '../data.json';

class Box {
    public constructor(
        public readonly name: string,
        public readonly position: google.maps.LatLng,
    ) {}
}

@Component({
    // tslint:disable-next-line
    selector: 'srd-boxes-map',
    templateUrl: './boxes-map.component.html',
    styleUrls: ['./boxes-map.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxesMapComponent {
    public mapCenter = new google.maps.LatLng(
        46.9606852,
        32.0003433,
    );

    public mapZoom = 12;

    public boxes: readonly Box[] = boxes.map<Box>(
        ({name, position}) => new Box(name, new google.maps.LatLng(position)),
    );

    public get boxesIsBig(): boolean {
        return this.mapZoom >= 16;
    }
}

