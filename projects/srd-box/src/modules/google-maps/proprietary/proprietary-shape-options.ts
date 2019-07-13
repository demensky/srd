// TODO: geodesic
import {ProprietaryMapItemOptions} from './proprietary-map-item-options';

export interface ProprietaryShapeOptions extends ProprietaryMapItemOptions {
  editable?: boolean;
  strokeColor?: string;
  strokeOpacity?: number;
  strokeWeight?: number;
}
