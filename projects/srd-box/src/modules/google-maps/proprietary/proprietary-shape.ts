import {ProprietaryMapItem} from './proprietary-map-item';
import {ProprietaryShapeOptions} from './proprietary-shape-options';

export interface ProprietaryShape extends ProprietaryMapItem {
  setOptions(options: ProprietaryShapeOptions): void;

  setEditable(editable: boolean): void;
}
