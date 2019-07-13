import {
    AfterContentInit,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    Inject,
    Input,
    IterableChanges,
    IterableDiffer,
    IterableDifferFactory,
    IterableDiffers,
    Output,
    QueryList,
    Self,
    TrackByFunction,
} from '@angular/core';
import {defer, Observable} from 'rxjs';
import {filter, map, startWith} from 'rxjs/operators';
import {fromGoogleMapsObject} from '../from-google-maps-object';
import {GoogleMapsMarkerDirective} from '../google-maps-marker/google-maps-marker.directive';
import {LatLngValueObservable} from '../lat-lng-value-observable';
import {MvcValueObservable} from '../mvc-value-observable';
import {ObservableHelperService} from '../observable-helper.service';
import {ProprietaryMapItem} from '../proprietary/proprietary-map-item';
import {GOOGLE_MAPS_MAP_ITEM_TOKEN} from '../tokens/google-maps-map-item-token';
import {GOOGLE_MAPS_MAP_TOKEN} from '../tokens/google-maps-map-token';

// TODO: https://developers.google.com/maps/documentation/javascript/reference/control
// TODO: https://developers.google.com/maps/documentation/javascript/reference/map#Map.fitBounds
// TODO: https://developers.google.com/maps/documentation/javascript/reference/map#Map.getBounds
// TODO: https://developers.google.com/maps/documentation/javascript/reference/map#Map.getClickableIcons
// TODO: https://developers.google.com/maps/documentation/javascript/reference/map#Map.getDiv
// TODO: https://developers.google.com/maps/documentation/javascript/reference/map#Map.getProjection
// TODO: https://developers.google.com/maps/documentation/javascript/reference/map#Map.getTilt
// TODO: https://developers.google.com/maps/documentation/javascript/reference/map#Map.panBy
// TODO: https://developers.google.com/maps/documentation/javascript/reference/map#Map.panTo
// TODO: https://developers.google.com/maps/documentation/javascript/reference/map#Map.panToBounds
// TODO: https://developers.google.com/maps/documentation/javascript/reference/map#Map.setClickableIcons
// TODO: https://developers.google.com/maps/documentation/javascript/reference/map#Map.setHeading
// TODO: https://developers.google.com/maps/documentation/javascript/reference/map#Map.setStreetView
// TODO: https://developers.google.com/maps/documentation/javascript/reference/map#Map.setTilt
// TODO: https://developers.google.com/maps/documentation/javascript/reference/map#Map.controls
// TODO: https://developers.google.com/maps/documentation/javascript/reference/map#Map.data
// TODO: other https://developers.google.com/maps/documentation/javascript/reference/map
/**
 * @dynamic
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'google-maps-map',
    templateUrl: './google-maps-map.component.html',
    styleUrls: ['./google-maps-map.component.scss'],
    exportAs: 'googleMapsMap',
    providers: [
        ObservableHelperService,
        {
            provide: GOOGLE_MAPS_MAP_TOKEN,
            useFactory: ({nativeElement}: ElementRef<HTMLElement>) =>
                new google.maps.Map(nativeElement),
            deps: [ElementRef],
        },
    ],
})
export class GoogleMapsMapComponent implements AfterContentInit {
    // TODO after https://github.com/angular/angular/issues/21152
    @ContentChildren(GoogleMapsMarkerDirective, {
        read: GOOGLE_MAPS_MAP_ITEM_TOKEN,
    })
    private _items!: QueryList<ProprietaryMapItem>;

    @Output()
    public readonly mapDoubleClick: Observable<
        google.maps.MouseEvent
    > = fromGoogleMapsObject<google.maps.MouseEvent>(this._map, 'dblclick');

    /**
     * @see {@link google.maps.Map#getCenter}
     */
    @Output()
    public readonly centerChange = new LatLngValueObservable(
        this._map,
        'center',
    );

    /**
     * @see {@link google.maps.Map#getZoom}
     */
    @Output()
    public readonly zoomChange = new MvcValueObservable<number>(
        this._map,
        'zoom',
    );

    /**
     * @see {@link google.maps.Map#getMapTypeId}
     */
    @Output()
    public readonly mapTypeIdChange = new MvcValueObservable<
        google.maps.MapTypeId
    >(this._map, 'mapTypeId');

    public constructor(
        @Inject(GOOGLE_MAPS_MAP_TOKEN)
        @Self()
        private readonly _map: google.maps.Map,
        private readonly _iterableDiffers: IterableDiffers,
        @Self() changeDetectorRef: ChangeDetectorRef,
        @Self() private readonly _observableHelper: ObservableHelperService,
    ) {
        // (window as any).map = _map;
        changeDetectorRef.detach();
    }

    /**
     * @see {@link google.maps.MapOptions#center}
     * @see {@link google.maps.Map#setCenter}
     */
    @Input()
    public set center(value: google.maps.LatLng) {
        this.centerChange.next(value);
    }

    /**
     * @see {@link google.maps.MapOptions#zoom}
     * @see {@link google.maps.Map.setZoom}
     */
    @Input()
    public set zoom(value: number) {
        this.zoomChange.next(value);
    }

    /**
     * @see {@link google.maps.MapOptions#mapTypeId}
     * @see {@link google.maps.Map#setMapTypeId}
     */
    @Input()
    public set mapTypeId(value: google.maps.MapTypeId) {
        this.mapTypeIdChange.next(value);
    }

    /**
     * @see {@link google.maps.MapOptions#clickableIcons}
     * @see {@link google.maps.Map#setClickableIcons}
     */
    @Input()
    public set clickableIcons(value: boolean) {
        this._map.setClickableIcons(value);
    }

    /**
     * @see {@link google.maps.MapOptions#gestureHandling}
     */
    @Input()
    public set disableDoubleClickZoom(disableDoubleClickZoom: boolean) {
        this._map.setOptions({disableDoubleClickZoom});
    }

    /**
     * @see {@link google.maps.MapOptions#disableDefaultUI}
     */
    @Input()
    public set disableDefaultUI(disableDefaultUI: boolean) {
        this._map.setOptions({disableDefaultUI});
    }

    /**
     * @see {@link google.maps.MapOptions#gestureHandling}
     */
    @Input()
    public set gestureHandling(
        gestureHandling: google.maps.GestureHandlingOptions,
    ) {
        this._map.setOptions({gestureHandling});
    }

    public ngAfterContentInit(): void {
        const iterableDifferFactory: IterableDifferFactory = this._iterableDiffers.find(
            [],
        );

        iterableDifferObservableFromQueryList<ProprietaryMapItem>(
            this._items,
            iterableDifferFactory,
        )
            .pipe(this._observableHelper.untilOnDestroy())
            .subscribe(iterableChanges => {
                iterableChanges.forEachAddedItem(({item}) => {
                    item.setMap(this._map);
                });

                iterableChanges.forEachRemovedItem(({item}) => {
                    item.setMap(null);
                });
            });
    }
}

function isNotNull<T>(value: T | null): value is T {
    return value !== null;
}

// TODO: extract to file
export function iterableDifferObservableFromQueryList<T>(
    queryList: QueryList<T>,
    iterableDifferFactory: IterableDifferFactory,
    trackByFn?: TrackByFunction<T>,
): Observable<IterableChanges<T>> {
    return defer<Observable<IterableChanges<T>>>(() => {
        const iterableDiffer: IterableDiffer<T> = iterableDifferFactory.create<
            T
        >(trackByFn);

        return queryList.changes.pipe(
            map(() => queryList.toArray()),
            startWith(queryList.toArray()),
            map(items => iterableDiffer.diff(items)),
            filter(isNotNull),
        );
    });
}
