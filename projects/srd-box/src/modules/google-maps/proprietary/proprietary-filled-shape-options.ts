import {ProprietaryShapeOptions} from './proprietary-shape-options';
import ProprietaryStrokePosition = google.maps.StrokePosition;

// TODO: geodesic
export interface ProprietaryFilledShapeOptions extends ProprietaryShapeOptions {
  fillColor?: string;
  fillOpacity?: number;
  strokePosition?: ProprietaryStrokePosition;
}
