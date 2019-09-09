import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {GM_MARKER_OPTIONS} from 'nggm';
import {boxes, districts, sections} from '../data.json';
import Color = require('color');

export interface UniqueLiteral {
    readonly id: string;
}

export interface NamedLiteral {
    readonly name: string;
}

export interface DistrictLiteral extends UniqueLiteral, NamedLiteral {}

export class District {
    public constructor(
        public readonly id: string,
        public readonly name: string,
    ) {}

    public static deserialize({id, name}: DistrictLiteral): District {
        return new District(id, name);
    }
}

export interface SectionLiteral extends NamedLiteral, UniqueLiteral {
    readonly color: string;
}

export class Section {
    public constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly color: Color,
    ) {}

    public static deserialize({id, name, color}: SectionLiteral): Section {
        return new Section(id, name, new Color(color));
    }
}

export interface BoxLiteral {
    readonly name: string;
    readonly districtId: string;
    readonly position: google.maps.ReadonlyLatLngLiteral;
    readonly sectionId: string;
    readonly client: boolean;
}

export class Box {
    public static deserialize({
        name,
        districtId,
        position,
        sectionId,
        client,
    }: BoxLiteral): Box {
        return new Box(
            name,
            districtId,
            new google.maps.LatLng(position),
            sectionId,
            client,
        );
    }

    private constructor(
        public readonly name: string,
        public readonly districtId: string,
        public readonly position: google.maps.LatLng,
        public readonly sectionId: string,
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

    public districts: readonly District[] = districts.map<District>(
        District.deserialize,
    );

    public sections: readonly Section[] = sections.map<Section>(
        Section.deserialize,
    );

    public currentBox: Box | null = null;

    public onBoxMarkerClick(box: Box, marker: google.maps.Marker): void {
        this.currentBox = box;
        this._infoWindow.open(undefined, marker);
    }

    public onInfoWindowCloseClick(): void {
        this.currentBox = null;
    }

    public getBoxesCount(district: District, section: Section): number {
        return this.boxes.reduce<number>(
            (result, box) =>
                district.id === box.districtId &&
                section.id === box.sectionId &&
                !box.client
                    ? result + 1
                    : result,
            0,
        );
    }

    public getBoxColor({sectionId}: Box): Color {
        return this.sections.find(({id}) => id === sectionId).color;
    }

    public boxTooltip({name, sectionId, client}: Box): string {
        let result = `${name}/${sectionId}`;

        if (client) {
            result += ' (арендован)';
        }

        return result;
    }
}
