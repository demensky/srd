import ProprietaryMap = google.maps.Map;
import {ProprietaryMapItemOptions} from './proprietary-map-item-options';

// TODO: setValues
// TODO: setMap StreetViewPanorama
export interface ProprietaryMapItem {
  getVisible(): boolean;
  getZIndex(): number;
  getDraggable(): boolean;
  // getMap(): GoogleMap | null;
  // getOptions(): O;
  setVisible(visible: boolean): void;
  setZIndex(zIndex: number): void;
  setDraggable(flag: boolean): void;
  setMap(map: ProprietaryMap | null): void;
  setClickable(value: boolean): void;
  setOptions(options: ProprietaryMapItemOptions): void;
}
